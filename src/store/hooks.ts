import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, store } from '@/store/store';
import React from 'react';

export const useReducer = (reducers = {}) => {
  const dispatch = useAppDispatch();

  store.reducerManager.addReducers(reducers);
  dispatch({ type: '@RELOAD_STATE' });

  React.useLayoutEffect(() => {
    return () => {
      store.reducerManager.removeReducers(Object.keys(reducers));
    };
  }, [reducers]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
