import { combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
import { IReducers } from '@/store/configStore';

const createReducerManager = (initialReducers: IReducers) => {
  const reducers = { ...initialReducers };
  let rootReducers = combineReducers(reducers);

  let keysToRemove: Array<string> = [];

  return {
    getReducers: () => reducers,
    reduce: (state: any, action: AnyAction) => {
      let newState = state;
      if (keysToRemove.length > 0) {
        newState = { ...state };
        for (let key of keysToRemove) {
          delete newState[key];
        }
        keysToRemove = [];
      }
      return rootReducers(newState, action);
    },
    addReducers: (newReducers: IReducers) => {
      Object.keys(newReducers).forEach((key: string) => {
        if (!key || !reducers[key]) {
          reducers[key] = newReducers[key];
        }
      });
      rootReducers = combineReducers(reducers);
    },
    removeReducers: (keys: string[]) => {
      keys.forEach((key) => {
        if (key && reducers[key]) {
          delete reducers[key];
          keysToRemove.push(key);
        }
      });
      rootReducers = combineReducers(reducers);
    },
  };
};

export default createReducerManager;
