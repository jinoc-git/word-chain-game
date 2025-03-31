import { createStore } from 'zustand/vanilla';

export type WordStoreState = {
  words: string[];
};

export type WordStoreActions = {
  getWordsCount: () => number;
  getLastWord: () => string;
  pushNewWord: (newWord: string) => void;
};

export type WordStore = WordStoreState & {
  actions: WordStoreActions;
};

const defaultInitState: WordStoreState = {
  words: [],
};

export const createWordStore = (initState: WordStoreState = defaultInitState) => {
  return createStore<WordStore>()((set, get) => ({
    ...initState,
    actions: {
      getWordsCount: () => {
        return get().words.length;
      },
      getLastWord: () => {
        const words = get().words;
        return words[words.length - 1];
      },
      pushNewWord: (newWord: string) => {
        const newWords = [...get().words, newWord];

        if (newWords.length > 3) newWords.shift();

        set({ words: newWords });
      },
    },
  }));
};
