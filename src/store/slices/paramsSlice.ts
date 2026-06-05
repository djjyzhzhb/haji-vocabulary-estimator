import { StateCreator } from 'zustand';
import { ModelParams, DEFAULT_PARAMS } from '../../types';
import { calculate } from '../../engine/calculator';
import { ResultSlice } from './resultSlice';

export interface ParamsSlice {
  params: ModelParams;
  updateParam: <K extends keyof ModelParams>(key: K, value: number) => void;
  setParams: (params: ModelParams) => void;
  resetParams: () => void;
}

export const createParamsSlice: StateCreator<ParamsSlice & ResultSlice, [], [], ParamsSlice> = (set, get) => ({
  params: { ...DEFAULT_PARAMS },

  updateParam: (key, value) => {
    const newParams = { ...get().params, [key]: value };
    const newResult = calculate(newParams);
    set({ params: newParams, result: newResult });
  },

  setParams: (params) => {
    const newResult = calculate(params);
    set({ params, result: newResult });
  },

  resetParams: () => {
    const newResult = calculate(DEFAULT_PARAMS);
    set({ params: { ...DEFAULT_PARAMS }, result: newResult });
  },
});
