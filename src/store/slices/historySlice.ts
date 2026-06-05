import { StateCreator } from 'zustand';
import { CalculationResult, ModelParams } from '../../types';
import { ResultSlice, ParamsSlice } from './';

export interface HistorySlice {
  history: CalculationResult[];
  saveToHistory: (name?: string) => void;
  loadFromHistory: (result: CalculationResult) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const loadHistoryFromStorage = (): CalculationResult[] => {
  try {
    const saved = localStorage.getItem('vocab_estimator_history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveHistoryToStorage = (history: CalculationResult[]) => {
  try {
    localStorage.setItem('vocab_estimator_history', JSON.stringify(history));
  } catch {
    console.error('Failed to save history');
  }
};

export const createHistorySlice: StateCreator<HistorySlice & ResultSlice & ParamsSlice, [], [], HistorySlice> = (set, get) => ({
  history: loadHistoryFromStorage(),

  saveToHistory: (name) => {
    const { result, history } = get();
    if (!result) return;

    const newResult = { ...result, name: name || new Date().toLocaleString('zh-CN') };
    const newHistory = [newResult, ...history].slice(0, 20);
    set({ history: newHistory });
    saveHistoryToStorage(newHistory);
  },

  loadFromHistory: (result) => {
    set({ params: { ...result.params }, result });
  },

  deleteFromHistory: (id) => {
    const { history } = get();
    const newHistory = history.filter((item) => item.id !== id);
    set({ history: newHistory });
    saveHistoryToStorage(newHistory);
  },

  clearHistory: () => {
    set({ history: [] });
    localStorage.removeItem('vocab_estimator_history');
  },
});
