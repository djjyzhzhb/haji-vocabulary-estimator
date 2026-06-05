export const ALPHA_L = 1.0;
export const ALPHA_R = 1 / 8;

export const SIGMA = {
  0: { total: 1, noR: 1 },
  1: { total: 1 / 8, noR: 1 / 12 },
  2: { total: 1 / 72, noR: 1 / 144 },
  3: { total: 1 / 1152, noR: 0 },
};

export const PI_DERIV = {
  1: 1.0,
  2: 2 / 3,
  3: 1 / 3,
};

export const VALIDATION_RANGES = {
  n: { min: 50, max: 500 },
  k: { min: 1, max: 10 },
  pi_L: { min: 0.01, max: 0.5 },
  pi_R: { min: 0.05, max: 1.0 },
  q_cmp2: { min: 0, max: 0.2 },
  q_cmp3: { min: 0, max: 0.005 },
  q_deriv1: { min: 0, max: 1 },
  q_deriv2: { min: 0, max: 0.2 },
  gamma1: { min: 0.1, max: 1 },
  gamma2: { min: 0.05, max: 1 },
};
