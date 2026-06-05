import { create } from "zustand";
import {
  ModelParams,
  DEFAULT_PARAMS,
  CalculationResult,
} from "../utils/calculator";
import VocabularyEstimator from "../utils/calculator";

interface AppState {
  params: ModelParams;
  result: CalculationResult | null;
  history: CalculationResult[];
  isLoading: boolean;
  
  updateParam: <K extends keyof ModelParams>(key: K, value: number) => void;
  setParams: (params: ModelParams) => void;
  resetParams: () => void;
  calculate: () => void;
  saveToHistory: () => void;
  loadFromHistory: (result: CalculationResult) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const performCalculation = (params: ModelParams): CalculationResult => {
  const estimator = new VocabularyEstimator(params);
  return estimator.calculateAll();
};

export const useAppStore = create<AppState>((set, get) => {
  const savedHistory = localStorage.getItem("vocab_estimator_history");
  const initialHistory: CalculationResult[] = savedHistory
    ? JSON.parse(savedHistory)
    : [];

  const initialResult = performCalculation(DEFAULT_PARAMS);

  return {
    params: { ...DEFAULT_PARAMS },
    result: initialResult,
    history: initialHistory,
    isLoading: false,

    updateParam: (key, value) => {
      const newParams = { ...get().params, [key]: value };
      const newResult = performCalculation(newParams);
      set({ params: newParams, result: newResult });
    },

    setParams: (params) => {
      const newResult = performCalculation(params);
      set({ params: { ...params }, result: newResult });
    },

    resetParams: () => {
      const newResult = performCalculation(DEFAULT_PARAMS);
      set({ params: { ...DEFAULT_PARAMS }, result: newResult });
    },

    calculate: () => {
      const newResult = performCalculation(get().params);
      set({ result: newResult });
    },

    saveToHistory: () => {
      const { result, history } = get();
      if (result) {
        const newHistory = [result, ...history].slice(0, 20);
        set({ history: newHistory });
        localStorage.setItem("vocab_estimator_history", JSON.stringify(newHistory));
      }
    },

    loadFromHistory: (result) => {
      set({ params: { ...result.params }, result });
    },

    deleteFromHistory: (id) => {
      const { history } = get();
      const newHistory = history.filter((item) => item.id !== id);
      set({ history: newHistory });
      localStorage.setItem("vocab_estimator_history", JSON.stringify(newHistory));
    },

    clearHistory: () => {
      set({ history: [] });
      localStorage.removeItem("vocab_estimator_history");
    },
  };
});
