import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice } from '@/store';

import { TAB_DEFAULT_KEY } from '@/pages/ranking/constants';

interface IRankingAction {
  setTabKey: ActionCreatorWithPayload<string, string>;
}

export const rankingActions: IRankingAction = {
  setTabKey: createAction('INIT'),
};

export const createReducer = (key: string) => {
  const { set: setTabKey, reducer: activeTabKey } = createTempSlice<string>('activeTabKey', TAB_DEFAULT_KEY, key);

  rankingActions.setTabKey = setTabKey;

  return {
    reducers: {
      [key]: combineReducers({
        activeTabKey,
      }),
    },
  };
};
