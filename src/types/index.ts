export interface ModelParams {
  n: number;
  k: number;
  pi_L: number;
  pi_R: number;
  q_cmp2: number;
  q_cmp3: number;
  q_deriv1: number;
  q_deriv2: number;
  gamma1: number;
  gamma2: number;
}

export const DEFAULT_PARAMS: ModelParams = {
  n: 192,
  k: 4,
  pi_L: 1 / 12,
  pi_R: 1 / 3,
  q_cmp2: 0.02,
  q_cmp3: 0.0002,
  q_deriv1: 0.5,
  q_deriv2: 0.02,
  gamma1: 2 / 3,
  gamma2: 1 / 2,
};

export interface SynchronicResult {
  total: number;
  E_cmp: Record<number, number>;
  E_noR: Record<number, number>;
  D: Record<number, number>;
  len_dist: Record<number, number>;
  1: number;
  2: number;
  3: number;
  4: number;
  C: number;
  H: number;
  details: {
    D_fused: Record<number, number>;
    D_unfused: Record<number, number>;
    cmp_fused: Record<number, number>;
    cmp_unfused: Record<number, number>;
  };
  // 详细构成分解
  composition: {
    monomorphemic: number;           // 单语素词（原生 + 融合）
    compound: {
      len2: number;
      len3: number;
      len4: number;
      total: number;
    };
    derivational: {
      len2: number;
      len3: number;
      len4: number;
      total: number;
    };
  };
}

export interface PrimaryNewMorphemes {
  n_cmp: number;
  n_deriv: number;
  n_total: number;
}

export interface PrimaryExtension {
  delta_stem: number;
  delta_prefix: number;
  delta_deriv: number;
  delta_rederiv_stem: number;
  delta_rederiv_prefix: number;
  total: number;
  per_stem_breakdown: {
    m1_L: number;
    m1_R: number;
    m1_total: number;
    m2_LL: number;
    m2_LR: number;
    m2_RL: number;
    m2_total: number;
    m3_single: number;
    m3_total: number;
    per_stem: number;
  };
  1: number;
  2: number;
  3: number;
  4: number;
  // 详细构成分解
  composition: {
    compound: {
      delta_stem: number;
      delta_prefix: number;
      total: number;
    };
    derivational: {
      delta_deriv: number;
      delta_rederiv_stem: number;
      delta_rederiv_prefix: number;
      total: number;
    };
  };
}

export interface SecondaryNewMorphemes {
  N2: number;
  part1: number;
  part2: number;
  part3: number;
  n_total: number;
}

export interface SecondaryExtension {
  delta_stem: number;
  delta_prefix: number;
  total: number;
  per_stem2: number;
  1: number;
  2: number;
  3: number;
  4: number;
  // 详细构成分解
  composition: {
    compound: {
      delta_stem: number;
      delta_prefix: number;
      total: number;
    };
    derivational: {
      total: number;
    };
  };
}

export interface CalculationResult {
  id: string;
  timestamp: number;
  name?: string;
  params: ModelParams;
  synchronic: SynchronicResult;
  primaryNewMorphemes: PrimaryNewMorphemes;
  primaryExtension: PrimaryExtension;
  secondaryNewMorphemes: SecondaryNewMorphemes;
  secondaryExtension: SecondaryExtension;
  total: number;
}

export interface SensitivityPoint {
  param: string;
  value: number;
  result: number;
}

export interface SensitivityCurve {
  param: string;
  min: number;
  max: number;
  points: SensitivityPoint[];
  elasticity: number;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  params: ModelParams;
  isDefault: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
