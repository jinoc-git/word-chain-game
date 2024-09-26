import React from 'react';

const useWords = () => {
  const [isValidWord, setIsValidWord] = React.useState(false);
  const [words, setWords] = React.useState<string[]>([]);

  const checkFirstCharacter = React.useCallback((before: string, now: string) => {
    const needCharacter = before.slice(-1);
    const firstCharacter = now.slice(0, 1);

    if (needCharacter === firstCharacter) return true;
    else return false;
  }, []);

  const checkValidWord = async (enterWord: string) => {};

  const enterWordAndCheck = async (enterWord: string) => {
    const lastWord = words[words.length - 1];
    const isValidFirstCharacter = checkFirstCharacter(lastWord, enterWord);
    if (!isValidFirstCharacter) return false;
  };

  return { isValidWord, enterWordAndCheck };
};

export default useWords;
