import ky from 'ky';
import { type NextRequest, NextResponse } from 'next/server';

import type { DictionaryApiResponse } from '@/types/dictionary.type';

const DICTIONARY_KEY = process.env.NEXT_PUBLIC_DICTIONARY_API_KEY;
const DICTIONARY_URL = 'https://opendict.korean.go.kr/api/search';

// 두음법칙도 적용해야함
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const word = searchParams.get('q');

    if (!word) return NextResponse.json('단어 미입력', { status: 401 });

    const result = await ky
      .get<DictionaryApiResponse>(DICTIONARY_URL, {
        searchParams: {
          key: DICTIONARY_KEY!,
          q: word,
          req_type: 'json',
          part: 'word', // 검색 대상 exam - 용례
          advanced: 'y', // 자세히 찾기
          type1: 'word', // all - 전체, phrase - 구, idiom - 관용구, proverb - 속담
          pos: '1,2', // 품사
        },
        headers: { 'Content-Type': 'application/json' },
      })
      .json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
