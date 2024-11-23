import storage from '@/utils/storage';
import { HISTORY_SEARCH_KEY } from '@/pages/search/constants';

const deleteArrItem = (arr: string[], val: string) => {
  const index = arr.findIndex((item) => item === val);

  if (index !== -1) {
    arr.splice(index, 1);
  }
};

export const setHistory = (value: string) => {
  if (!value) return;
  let arr: string[] = storage.get(HISTORY_SEARCH_KEY) || [];

  deleteArrItem(arr, value);

  arr.unshift(value);

  storage.set(HISTORY_SEARCH_KEY, arr);
  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: HISTORY_SEARCH_KEY } }));
};

export const deleteHistory = (val: string) => {
  const arr = storage.get(HISTORY_SEARCH_KEY);
  deleteArrItem(arr, val);
  storage.set(HISTORY_SEARCH_KEY, arr);
  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: HISTORY_SEARCH_KEY } }));
};

export const clearHistory = () => {
  storage.remove(HISTORY_SEARCH_KEY);
  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: HISTORY_SEARCH_KEY } }));
};
