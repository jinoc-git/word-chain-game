import { assemble, disassembleCompleteCharacter } from 'es-hangul';

import {
  DUEUM_MOEUM_NIEUN_TO_IEUNG,
  DUEUM_MOEUM_RIEUL_TO_IEUNG,
  DUEUM_MOEUM_RIEUL_TO_NIEUN,
} from '@/constants/dueum';
import { checkDictionary } from '@/lib/apiRoute/word';

type ConversionRule = { moeums: string[]; targetChoseong: 'ㅇ' | 'ㄴ' };
const conversionRules: Record<string, Array<ConversionRule>> = {
  ㄴ: [{ moeums: DUEUM_MOEUM_NIEUN_TO_IEUNG, targetChoseong: 'ㅇ' }],
  ㄹ: [
    { moeums: DUEUM_MOEUM_RIEUL_TO_NIEUN, targetChoseong: 'ㄴ' },
    { moeums: DUEUM_MOEUM_RIEUL_TO_IEUNG, targetChoseong: 'ㅇ' },
  ],
};

/**
 * 글자가 두음 법칙이 적용되는 글자면 두음 법칙을 적용한 글자를 반환.
 * 아닐 경우 글자 그대로 반환
 */
const convertDueum = (char: string) => {
  const disassembledChar = disassembleCompleteCharacter(char);
  if (!disassembledChar) return char;

  const { choseong, jungseong } = disassembledChar;

  const rules = conversionRules[choseong];
  if (!rules) return char;

  for (const rule of rules) {
    if (rule.moeums.includes(jungseong)) {
      disassembledChar.choseong = rule.targetChoseong;
      return assemble(Object.values(disassembledChar));
    }
  }

  return char;
};

const checkFirstCharacter = (before: string, now: string) => {
  const beforeCharacter = before.slice(-1);
  const nowCharacter = now.slice(0, 1);

  if (beforeCharacter === nowCharacter) return true;
  if (convertDueum(beforeCharacter) === nowCharacter) return true;

  return false;
};

const checkOnlyKorean = (text: string) => {
  const koreaRegex = /^[가-힣]+$/;
  return koreaRegex.test(text);
};

export const checkWordIsValid = async (lastWord: string, enterWord: string) => {
  const isOnlyKorean = checkOnlyKorean(enterWord);
  if (!isOnlyKorean) return false;

  const isValidFirstCharacter = checkFirstCharacter(lastWord, enterWord);
  if (!isValidFirstCharacter) return false;

  const isExistWord = await checkDictionary(enterWord);
  if (!isExistWord) return false;

  return true;
};
