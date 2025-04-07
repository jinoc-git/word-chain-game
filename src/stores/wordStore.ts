import { createStore } from 'zustand/vanilla';

import { getRandomFirstWord } from '@/utils/getRandomFirstWord';

export type WordStoreState = {
  totalWordCount: number;
  words: string[];
};

export type WordStoreActions = {
  // getWordsCount: () => number;
  getLastWord: () => string;
  initRandomWord: () => void;
  pushNewWord: (newWord: string) => void;
  resetWords: () => void;
};

export type WordStore = {
  state: WordStoreState;
  actions: WordStoreActions;
};

const defaultInitState: WordStoreState = {
  totalWordCount: 1, // 게임 시작 시 첫 단어를 제공하기 때문
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
      initRandomWord: () => {
        set({ state: { totalWordCount: 1, words: [getRandomFirstWord()] } });
      },
      pushNewWord: (newWord: string) => {
        const newWords = [...get().state.words, newWord];

        if (newWords.length > 3) newWords.shift();

        set(({ state }) => ({
          state: { words: newWords, totalWordCount: state.totalWordCount + 1 },
        }));
      },
      resetWords: () => set({ state: { words: [], totalWordCount: 1 } }),
    },
  }));
};
