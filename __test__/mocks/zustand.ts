import { act } from '@testing-library/react';

import type * as ZustandExportedTypes from 'zustand';
export * from 'zustand';

const { createStore: actualCreateStore } =
  await vi.importActual<typeof ZustandExportedTypes>('zustand');

export const storeResetFns = new Set<() => void>();

const createStoreUncurried = <T>(stateCreator: ZustandExportedTypes.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

export const createStore = (<T>(stateCreator: ZustandExportedTypes.StateCreator<T>) => {
  console.log('zustand createStore mock');

  return typeof stateCreator === 'function'
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof ZustandExportedTypes.createStore;

afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
