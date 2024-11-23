import { configureStore, Middleware, Reducer } from '@reduxjs/toolkit';

import createReducerManager from '@/store/createReducerManager';

export interface IReducers {
  [key: string]: Reducer;
}

const configStore = (reducers: IReducers, middleware: Middleware[]) => {
  const reducerManager = createReducerManager({ ...reducers });

  const internalStore = configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  });

  type TStore = typeof internalStore;

  interface IStore extends TStore {
    reducerManager: ReturnType<typeof createReducerManager>;
  }

  const store = internalStore as IStore;

  store.reducerManager = reducerManager;

  return store;
};

export default configStore;
