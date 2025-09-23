import { createStore } from 'zustand/vanilla';

export type CountStoreState = {
  _timeoutId: ReturnType<typeof setTimeout> | undefined;
  isActiveCount: boolean;
  count: number;
};

export type CountStoreActions = {
  startCount: () => void;
  endCount: () => void;
  resetCount: () => void;
  pauseCount: () => void;
  resumeCount: () => void;
  reStartCount: () => void;
  _clearTimeout: () => void;
  _tick: () => void;
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
  const cloneInit = () => ({ ...initState, _timeoutId: undefined, isActiveCount: false });

  return createStore<CountStore>()((set, get) => ({
    state: cloneInit(),
    actions: {
      _clearTimeout: () => {
        const id = get().state._timeoutId;
        if (id !== undefined) {
          clearTimeout(id);
          set(({ state }) => ({ state: { ...state, _timeoutId: undefined } }));
        }
      },

      _tick: () => {
        const { count, isActiveCount } = get().state;
        if (!isActiveCount) return;

        if (count <= 0) {
          get().actions._clearTimeout();
          set(({ state }) => ({ state: { ...state, isActiveCount: false, count: 0 } }));
          return;
        }

        set(({ state }) => ({ state: { ...state, count: state.count - 1 } }));

        const timeoutId = setTimeout(() => {
          get().actions._tick();
        }, 1000);

        set(({ state }) => ({ state: { ...state, _timeoutId: timeoutId } }));
      },

      startCount: () => {
        const { isActiveCount } = get().state;
        if (isActiveCount) return;

        set(({ state }) => {
          const next = { ...state, isActiveCount: true };
          return { state: next };
        });

        get().actions._tick();
      },

      reStartCount: () => {
        const wasActive = get().state.isActiveCount;
        get().actions._clearTimeout();
        set(({ state }) => ({ state: { ...state, count: initState.count } }));

        if (wasActive) {
          const timeoutId = setTimeout(() => {
            get().actions._tick();
          }, 1000);
          set(({ state }) => ({ state: { ...state, _timeoutId: timeoutId } }));
        }
      },

      pauseCount: () => {
        get().actions._clearTimeout();
        set(({ state }) => ({ state: { ...state, isActiveCount: false } }));
      },

      resumeCount: () => {
        const { isActiveCount } = get().state;
        if (isActiveCount) return;
        set(({ state }) => ({ state: { ...state, isActiveCount: true } }));
        get().actions._tick();
      },

      resetCount: () => {
        get().actions._clearTimeout();
        set(({ state }) => ({
          state: { ...state, count: initState.count, isActiveCount: false },
        }));
      },

      endCount: () => {
        get().actions._clearTimeout();
        set({ state: cloneInit() });
      },
    },
  }));
};
