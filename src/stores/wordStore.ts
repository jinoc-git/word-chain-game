import { createStore } from 'zustand/vanilla';

import { createClient } from '@/utils/supabase/client';
import { getRandomFirstWord } from '@/utils/word/getRandomFirstWord';

import type { Room } from '@/types/supabase';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

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
  getCurrentWords: () => string[];
  streamWord: (roomCode: string) => RealtimeChannel;
  streamWordCallback: (payload: RealtimePostgresChangesPayload<Room>) => void;
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
      getCurrentWords: () => get().state.words,
      streamWord: (roomCode) => {
        const supabase = createClient();
        const channel = supabase
          .channel(`room-${roomCode}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'rooms',
              filter: `room_code=eq.${roomCode}`,
            },
            get().actions.streamWordCallback,
          )
          .subscribe();

        return channel;
      },
      streamWordCallback: (payload) => {
        if (payload.errors === null) {
          const row = payload?.new;
          if (row && 'current_word' in row) {
            set({
              state: {
                totalWordCount: row.current_word?.length || 0,
                words: row.current_word || [],
              },
            });
            row.current_word;
          }
        }
      },
    },
  }));
};
