import { combineReducers, createAction, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { parse } from 'query-string';
import { createTempSlice } from '@/store';

interface ISearchAction {
  setSearchMode: ActionCreatorWithPayload<boolean, string>;
  setSearchKeyword: ActionCreatorWithPayload<string, string>;
}

export const searchActions: ISearchAction = {
  setSearchMode: createAction('INIT'),
  setSearchKeyword: createAction('INIT'),
};

export const createReducer = (key: string) => {
  const keyword = parse(window.location.search).keyword;
  const { set: setSearchKeyword, reducer: searchKeyword } = createTempSlice<string>(
    'searchParamas',
    typeof keyword !== 'string' ? '' : keyword,
    key
  );
  const { set: setSearchMode, reducer: searchMode } = createTempSlice<boolean>('searchMode', false, key);

  searchActions.setSearchMode = setSearchMode;
  searchActions.setSearchKeyword = setSearchKeyword;

  return {
    reducers: {
      [key]: combineReducers({
        searchMode,
        searchKeyword,
      }),
    },
  };
};
