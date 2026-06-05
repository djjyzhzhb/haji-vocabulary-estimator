import { ModelParams, CalculationResult } from '../types';
import { calculateSynchronic } from './synchronicModel';
import { calculatePrimaryNewMorphemes, calculatePrimaryExtension, calculateSecondaryNewMorphemes, calculateSecondaryExtension } from './extensionModel';

export function calculate(params: ModelParams): CalculationResult {
  const synchronic = calculateSynchronic(params);
  const primaryNewMorphemes = calculatePrimaryNewMorphemes(params, synchronic.E_cmp, synchronic.E_noR);
  const primaryExtension = calculatePrimaryExtension(params, primaryNewMorphemes.n_total, primaryNewMorphemes.n_cmp);
  const secondaryNewMorphemes = calculateSecondaryNewMorphemes(primaryExtension, primaryNewMorphemes);
  const secondaryExtension = calculateSecondaryExtension(params, primaryNewMorphemes, secondaryNewMorphemes);

  const total = synchronic.total + primaryExtension.total + secondaryExtension.total;

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    timestamp: Date.now(),
    params: { ...params },
    synchronic,
    primaryNewMorphemes,
    primaryExtension,
    secondaryNewMorphemes: {
      ...secondaryNewMorphemes,
      n_total: secondaryNewMorphemes.N2,
    },
    secondaryExtension,
    total,
  };
}
