import ky from 'ky';
import { type NextRequest, NextResponse } from 'next/server';

import type { ApiResponse } from '@/types/naver.type';

const WORD_URL = 'https://openapi.naver.com/v1/search/encyc.json';
const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const word = searchParams.get('query');

    if (!word) return NextResponse.json('단어 미입력', { status: 401 });

    const result = await ky
      .get<ApiResponse>(WORD_URL, {
        searchParams: { query: word },
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      })
      .json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json(error.name, { status: 401 });
  }
};
