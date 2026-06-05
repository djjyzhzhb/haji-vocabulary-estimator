import { create } from 'zustand';
import { createParamsSlice, createResultSlice, createHistorySlice, ParamsSlice, ResultSlice, HistorySlice } from './slices';
import { calculate } from '../engine/calculator';
import { DEFAULT_PARAMS } from '../types';

type AppState = ParamsSlice & ResultSlice & HistorySlice;

export const useAppStore = create<AppState>()((...args) => {
  const paramsSlice = createParamsSlice(...args);
  const resultSlice = createResultSlice(...args);
  const historySlice = createHistorySlice(...args);

  const initialResult = calculate(DEFAULT_PARAMS);

  return {
    ...paramsSlice,
    ...resultSlice,
    ...historySlice,
    result: initialResult,
  };
});
