import React from 'react';

import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { checkWordIsValid } from '@/utils/checkWordIsValid';

const useWords = () => {
  const [isValidWord, setIsValidWord] = React.useState(false);
  const { getLastWord, pushNewWord } = useWordActions((actions) => actions);

  const checkWord = async (enterWord: string) => {
    const isValid = await checkWordIsValid(getLastWord(), enterWord);
    if (isValid) {
      setIsValidWord(true);
      return true;
    } else {
      setIsValidWord(false);
      return false;
    }
  };

  return { isValidWord, checkWord, pushNewWord };
};

export default useWords;
