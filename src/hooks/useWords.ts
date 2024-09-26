import React from 'react';

import { useWordActions } from '@/store/wordStore';

const useWords = () => {
  const [isValidWord, setIsValidWord] = React.useState(false);
  const { getWordsCount, getLastWord, pushNewWord } = useWordActions();

  const checkFirstCharacter = React.useCallback((before: string, now: string) => {
    const needCharacter = before.slice(-1);
    const firstCharacter = now.slice(0, 1);

    if (needCharacter === firstCharacter) return true;
    else return false;
  }, []);

  const checkValidWord = async (enterWord: string) => {
    // 백과사전 api를 통해 있는 단어인지 확인
    return true;
  };

  const enterWordAndCheck = async (enterWord: string) => {
    if (getWordsCount() >= 1) {
      const lastWord = getLastWord();
      const isValidFirstCharacter = checkFirstCharacter(lastWord, enterWord);
      if (!isValidFirstCharacter) {
        setIsValidWord(false);
        return false;
      }
    }

    const isExistWord = await checkValidWord(enterWord);
    if (!isExistWord) {
      setIsValidWord(false);
      return false;
    }

    pushNewWord(enterWord);
    setIsValidWord(true);

    return true;
  };

  return { isValidWord, enterWordAndCheck };
};

export default useWords;
