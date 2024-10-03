import React from 'react';

import { checkValidWord } from '@/api/word';
import { useWordActions } from '@/store/wordStore';
import { checkFirstCharacter } from '@/utils/checkFirstCharacter';

const useWords = () => {
  const [isValidWord, setIsValidWord] = React.useState(false);
  const { getWordsCount, getLastWord, pushNewWord } = useWordActions();

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
