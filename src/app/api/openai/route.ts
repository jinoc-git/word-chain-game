import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export const POST = async (req: Request) => {
  const { word } = await req.json();

  const prompt = `끝말잇기 놀이를 하고 있어. 이전 단어는 "${word}"야 다음 단어를 추천해줘! 예를 들면 자신감 이렇게만 보내줘. 단, 단어만 답변해주고 단어가 없으면 "${AI_DEFEATED_FLAG}"라고 보내줘`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 30,
    temperature: 0.7,
  });

  const nextWord = response.choices[0].message.content?.trim();

  return NextResponse.json(nextWord, { status: 200 });
};
