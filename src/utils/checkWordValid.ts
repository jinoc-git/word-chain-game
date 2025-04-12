import { assemble, disassembleCompleteCharacter } from 'es-hangul';

import {
  DUEUM_MOEUM_NIEUN_TO_IEUNG,
  DUEUM_MOEUM_RIEUL_TO_IEUNG,
  DUEUM_MOEUM_RIEUL_TO_NIEUN,
} from '@/constants/dueum';
import { checkDictionary } from '@/lib/word';

/**
 * 글자가 두음 법칙이 적용되는 글자면 두음 법칙을 적용한 글자를 반환.
 * 아닐 경우 글자 그대로 반환
 */
const convertDueum = (char: string) => {
  const disassembleChar = disassembleCompleteCharacter(char);
  const isNieun = disassembleChar?.choseong === 'ㄴ';
  const isRieul = disassembleChar?.choseong === 'ㄹ';

  if (isNieun) {
    const isDueumMoeum = DUEUM_MOEUM_NIEUN_TO_IEUNG.includes(disassembleChar.jungseong);
    if (isDueumMoeum) {
      disassembleChar.choseong = 'ㅇ';
      const finalCharacter = assemble(Object.values(disassembleChar));
      return finalCharacter;
    }

    return char;
  }

  if (isRieul) {
    const isDueumMoeumToNieun = DUEUM_MOEUM_RIEUL_TO_NIEUN.includes(disassembleChar.jungseong);
    if (isDueumMoeumToNieun) {
      disassembleChar.choseong = 'ㄴ';
      const finalCharacter = assemble(Object.values(disassembleChar));
      return finalCharacter;
    }
    const isDueumMoeumToIeung = DUEUM_MOEUM_RIEUL_TO_IEUNG.includes(disassembleChar.jungseong);
    if (isDueumMoeumToIeung) {
      disassembleChar.choseong = 'ㅇ';
      const finalCharacter = assemble(Object.values(disassembleChar));
      console.log(finalCharacter);
      return finalCharacter;
    }

    return char;
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
