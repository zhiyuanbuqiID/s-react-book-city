import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createTempSlice = <T>(name: string, initialState: T, key?: string) => {
  const slice = createSlice({
    name: `${key}.${name}`,
    initialState,
    reducers: {
      set: (_, action: PayloadAction<T>) => action.payload,
    },
  });

  return { set: slice.actions.set, reducer: slice.reducer };
};
