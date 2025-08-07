import { NextResponse } from 'next/server';

import { addWord } from '@/lib/serverActions/rooms';

import type { PostWordArgs } from '@/lib/apiRoute/word';
import type { Room } from '@/types/supabase';
import type { NextRequest } from 'next/server';

export type PostWordResponse =
  | {
      success: true;
      data: Room;
    }
  | {
      success: false;
      data: null;
    };

export const POST = async (request: NextRequest) => {
  const { roomCode, words }: PostWordArgs = await request.json();

  const { data, error } = await addWord(roomCode, words);

  if (error) {
    return NextResponse.json({ success: false, data: null });
  } else {
    return NextResponse.json({ success: true, data });
  }
};
