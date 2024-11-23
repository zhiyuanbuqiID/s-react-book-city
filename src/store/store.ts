import { Middleware, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import configStore from '@/store/configStore';

import counterReducer from '@/store/slices/counterSlice';

const middleware: Middleware[] = [];

const rootReducers = {
  counter: counterReducer,
};

export const store = configStore(rootReducers, middleware);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<AppState, unknown, AnyAction>;
export type AppThunk<ReturnType> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
