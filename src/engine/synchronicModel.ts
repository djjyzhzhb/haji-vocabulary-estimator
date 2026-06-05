import { ModelParams } from '../types';
import { SIGMA, PI_DERIV } from './constants';

function P_star(n: number, m: number): number {
  return Math.pow(n, m + 1);
}

function q_cmp(params: ModelParams, L: number): number {
  if (L === 2) return params.q_cmp2;
  if (L === 3) return params.q_cmp3;
  return 0;
}

function q_deriv(params: ModelParams, L: number): number {
  if (L === 1) return params.q_deriv1;
  if (L === 2) return params.q_deriv2;
  if (L === 3) return 0;
  return 0;
}

export function calculateSynchronic(params: ModelParams) {
  const { n, k } = params;

  const E_cmp: Record<number, number> = {};
  const E_noR: Record<number, number> = {};

  for (let m = 0; m < 4; m++) {
    const L = m + 1;
    const s_total = SIGMA[m as keyof typeof SIGMA].total;
    const s_noR = SIGMA[m as keyof typeof SIGMA].noR;

    E_cmp[L] = P_star(n, m) * s_total;
    E_noR[L] = P_star(n, m) * s_noR;
  }

  const D: Record<number, number> = {};
  for (let L = 1; L <= 3; L++) {
    D[L] = E_noR[L] * k * PI_DERIV[L as keyof typeof PI_DERIV];
  }

  const len_dist: Record<number, number> = {
    1: E_cmp[1],
    2: E_cmp[2],
    3: E_cmp[3],
    4: E_cmp[4],
  };

  const D_fused: Record<number, number> = {};
  const D_unfused: Record<number, number> = {};

  for (let L = 1; L <= 3; L++) {
    D_fused[L] = D[L] * q_deriv(params, L);
    D_unfused[L] = D[L] * (1 - q_deriv(params, L));

    len_dist[1] += D_fused[L];
    len_dist[L + 1] += D_unfused[L];
  }

  const cmp_fused: Record<number, number> = {};
  const cmp_unfused: Record<number, number> = {};

  for (let L = 1; L <= 4; L++) {
    cmp_fused[L] = E_cmp[L] * q_cmp(params, L);
    cmp_unfused[L] = E_cmp[L] * (1 - q_cmp(params, L));
  }

  for (let L = 2; L <= 3; L++) {
    len_dist[1] += cmp_fused[L];
    len_dist[L] -= cmp_fused[L];
  }

  const total = len_dist[1] + len_dist[2] + len_dist[3] + len_dist[4];

  // 计算构成数据
  const monomorphemic = len_dist[1];
  
  const compound_total = (cmp_unfused[2] || 0) + (cmp_unfused[3] || 0) + (cmp_unfused[4] || 0);
  const compound_len2 = cmp_unfused[2] || 0;
  const compound_len3 = cmp_unfused[3] || 0;
  const compound_len4 = cmp_unfused[4] || 0;
  
  const derivational_total = (D_unfused[1] || 0) + (D_unfused[2] || 0) + (D_unfused[3] || 0);
  const derivational_len2 = D_unfused[1] || 0;
  const derivational_len3 = D_unfused[2] || 0;
  const derivational_len4 = D_unfused[3] || 0;

  return {
    total,
    E_cmp,
    E_noR,
    D,
    len_dist,
    1: len_dist[1],
    2: len_dist[2],
    3: len_dist[3],
    4: len_dist[4],
    C: (E_cmp[2] || 0) + (E_cmp[3] || 0) + (E_cmp[4] || 0),
    H: Object.values(D).reduce((a, b) => a + b, 0),
    details: {
      D_fused,
      D_unfused,
      cmp_fused,
      cmp_unfused,
    },
    composition: {
      monomorphemic,
      compound: {
        len2: compound_len2,
        len3: compound_len3,
        len4: compound_len4,
        total: compound_total,
      },
      derivational: {
        len2: derivational_len2,
        len3: derivational_len3,
        len4: derivational_len4,
        total: derivational_total,
      },
    },
  };
}
