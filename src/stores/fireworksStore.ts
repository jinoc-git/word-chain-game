import { createStore } from 'zustand/vanilla';

type TRunAnimationParams = {
  speed: number;
  duration?: number;
  delay?: number;
};

type TConductorInstance = {
  run: (params: TRunAnimationParams) => void;
  shoot: () => void;
  pause: () => void;
  stop: () => void;
};

export type FireworksStoreState = {
  controller: TConductorInstance | null;
};

export type FireworksStoreActions = {
  onInitHandler: (instance: TConductorInstance) => void;
  onShoot: () => void;
};

export type FireworksStore = FireworksStoreState & {
  actions: FireworksStoreActions;
};

const defaultInitState: FireworksStoreState = {
  controller: null,
};

export const createFireworksStore = (initState: FireworksStoreState = defaultInitState) => {
  return createStore<FireworksStore>()((set, get) => ({
    ...initState,
    actions: {
      onInitHandler: (instance) => set({ controller: instance }),
      onShoot: () => {
        const controller = get().controller;
        if (controller) controller.shoot();
      },
    },
  }));
};
