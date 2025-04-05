import React from 'react';

import { checkValidWord } from '@/lib/word';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { checkFirstCharacter } from '@/utils/checkFirstCharacter';
import checkOnlyKorean from '@/utils/checkOnlyKorean';

const useWords = () => {
  const [isValidWord, setIsValidWord] = React.useState(false);
  const { getWordsCount, getLastWord, pushNewWord } = useWordActions((actions) => actions);

  const checkWordIsValid = async (enterWord: string) => {
    const isOnlyKorean = checkOnlyKorean(enterWord);
    if (!isOnlyKorean) {
      setIsValidWord(false);
      return false;
    }
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

    setIsValidWord(true);
    return true;
  };

  return { isValidWord, checkWordIsValid, pushNewWord };
};

export default useWords;
