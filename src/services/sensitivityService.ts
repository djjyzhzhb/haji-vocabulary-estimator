import { ModelParams, SensitivityCurve, SensitivityPoint } from '../types';
import { calculate } from '../engine/calculator';

const PARAM_RANGES: Record<string, { min: number; max: number }> = {
  n: { min: 100, max: 300 },
  k: { min: 2, max: 8 },
  pi_L: { min: 0.05, max: 0.2 },
  pi_R: { min: 0.1, max: 0.6 },
  q_cmp2: { min: 0.005, max: 0.05 },
  q_cmp3: { min: 0.0001, max: 0.0005 },
  q_deriv1: { min: 0.3, max: 0.7 },
  q_deriv2: { min: 0.005, max: 0.05 },
  gamma1: { min: 0.3, max: 0.9 },
  gamma2: { min: 0.2, max: 0.8 },
};

export function calculateSensitivity(
  baseParams: ModelParams,
  paramName: string,
  numPoints: number = 50
): SensitivityCurve {
  const range = PARAM_RANGES[paramName];
  if (!range) {
    throw new Error(`Unknown parameter: ${paramName}`);
  }

  const points: SensitivityPoint[] = [];
  const step = (range.max - range.min) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const value = range.min + step * i;
    const testParams = { ...baseParams, [paramName]: value };
    const result = calculate(testParams);
    points.push({
      param: paramName,
      value,
      result: result.total,
    });
  }

  const baseResult = calculate(baseParams).total;
  const midPoint = Math.floor(numPoints / 2);
  const deltaResult = points[numPoints - 1].result - points[0].result;
  const deltaParam = range.max - range.min;
  const elasticity = (deltaResult / baseResult) / (deltaParam / ((range.min + range.max) / 2));

  return {
    param: paramName,
    min: range.min,
    max: range.max,
    points,
    elasticity,
  };
}

export function calculateAllSensitivities(baseParams: ModelParams) {
  const params = Object.keys(PARAM_RANGES) as Array<keyof ModelParams>;
  const results: SensitivityCurve[] = [];

  for (const param of params) {
    results.push(calculateSensitivity(baseParams, param));
  }

  return results.sort((a, b) => Math.abs(b.elasticity) - Math.abs(a.elasticity));
}
