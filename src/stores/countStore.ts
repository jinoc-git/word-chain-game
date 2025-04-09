import { createStore } from 'zustand/vanilla';

export type CountStoreState = {
  _timeoutId: NodeJS.Timeout | undefined;
  isActiveCount: boolean;
  count: number;
};

export type CountStoreActions = {
  startCount: () => void;
  endCount: () => void;
  resetCount: () => void;
  pauseCount: () => void;
  resumeCount: () => void;
  _clearTimeout: () => void;
};

export type CountStore = {
  state: CountStoreState;
  actions: CountStoreActions;
};

const defaultInitState: CountStoreState = {
  _timeoutId: undefined,
  isActiveCount: false,
  count: 10,
};

export const createCountStore = (initState: CountStoreState = defaultInitState) => {
  return createStore<CountStore>()((set, get) => ({
    state: initState,
    actions: {
      startCount: () => {
        const { isActiveCount, count } = get().state;
        if (!isActiveCount && count === 0) return;

        const { _clearTimeout, startCount } = get().actions;

        _clearTimeout();
        const timeoutId = setTimeout(() => {
          set(({ state }) => ({ state: { ...state, count: state.count - 1 } }));
          return startCount();
        }, 1000);
        set(({ state }) => ({ state: { ...state, _timeoutId: timeoutId } }));
      },
      endCount: () => {
        get().actions._clearTimeout();
        set({ state: initState });
      },
      resetCount: () => {
        get().actions._clearTimeout();
        set(({ state }) => ({ state: { ...state, count: initState.count } }));
      },
      pauseCount: () => {
        get().actions._clearTimeout();
        set(({ state }) => ({ state: { ...state, isActiveCount: false } }));
      },
      resumeCount: () => {
        set(({ state }) => ({ state: { ...state, isActiveCount: true } }));
        get().actions.startCount();
      },
      _clearTimeout: () => clearTimeout(get().state._timeoutId),
    },
  }));
};
