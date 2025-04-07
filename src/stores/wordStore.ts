import { createStore } from 'zustand/vanilla';

export type WordStoreState = {
  totalWordCount: number;
  words: string[];
};

export type WordStoreActions = {
  // getWordsCount: () => number;
  getLastWord: () => string;
  pushNewWord: (newWord: string) => void;
  resetWords: () => void;
};

export type WordStore = {
  state: WordStoreState;
  actions: WordStoreActions;
};

const defaultInitState: WordStoreState = {
  totalWordCount: 0,
  words: [],
};

export const createWordStore = (initState: WordStoreState = defaultInitState) => {
  return createStore<WordStore>()((set, get) => ({
    state: initState,
    actions: {
      // getWordsCount: () => {
      //   return get().state.words.length;
      // },
      getLastWord: () => {
        const words = get().state.words;
        return words[words.length - 1];
      },
      pushNewWord: (newWord: string) => {
        const newWords = [...get().state.words, newWord];

        if (newWords.length > 3) newWords.shift();

        set(({ state }) => ({
          state: { words: newWords, totalWordCount: state.totalWordCount + 1 },
        }));
      },
      resetWords: () => set({ state: { words: [], totalWordCount: 0 } }),
    },
  }));
};
