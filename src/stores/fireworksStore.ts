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
  controller: any;
};

export type FireworksStoreActions = {
  onInitHandler: () => void;
  onShoot: () => void;
};

export type FireworksStore = FireworksStoreState & {
  actions: FireworksStoreActions;
};

const defaultInitState: FireworksStoreState = {
  controller: null,
};

export const createFireworksStore = (initState: FireworksStoreState = defaultInitState) => {
  return createStore<FireworksStore>()(() => ({
    ...initState,
    actions: {
      onInitHandler: () => {},
      onShoot: () => {},
    },
  }));
};
