import { StateCreator } from 'zustand';
import { CalculationResult, ModelParams } from '../../types';
import { calculate } from '../../engine/calculator';
import { ParamsSlice } from './paramsSlice';

export interface ResultSlice {
  result: CalculationResult | null;
  calculate: () => void;
}

export const createResultSlice: StateCreator<ResultSlice & ParamsSlice, [], [], ResultSlice> = (set, get) => ({
  result: null,

  calculate: () => {
    const params = get().params;
    const result = calculate(params);
    set({ result });
  },
});
