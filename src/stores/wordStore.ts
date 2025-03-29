import { create } from 'zustand';

interface Actions {
  getWordsCount: () => number;
  getLastWord: () => string;
  pushNewWord: (newWord: string) => void;
}

interface Store {
  words: string[];
  actions: Actions;
}

export const wordStore = create<Store>((set, get) => ({
  words: [],
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

export const useWordState = () => wordStore(({ words }) => words);
export const useWordActions = () => wordStore(({ actions }) => actions);
