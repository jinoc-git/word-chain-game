import { NextResponse } from 'next/server';

import type { PostWordArgs } from '@/lib/apiRoute/word';
import type { NextRequest } from 'next/server';

export type PostWordResponse = {};

export const POST = async (request: NextRequest) => {
  const {}: PostWordArgs = await request.json();

  return NextResponse.json({});
};
