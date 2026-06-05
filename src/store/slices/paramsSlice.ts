import { StateCreator } from 'zustand';
import { ModelParams, DEFAULT_PARAMS } from '../../types';

export interface ParamsSlice {
  params: ModelParams;
  updateParam: <K extends keyof ModelParams>(key: K, value: number) => void;
  setParams: (params: ModelParams) => void;
  resetParams: () => void;
}

export const createParamsSlice: StateCreator<ParamsSlice, [], [], ParamsSlice> = (set) => ({
  params: { ...DEFAULT_PARAMS },

  updateParam: (key, value) => set((state) => ({
    params: { ...state.params, [key]: value },
  })),

  setParams: (params) => set({ params }),

  resetParams: () => set({ params: { ...DEFAULT_PARAMS } }),
});
