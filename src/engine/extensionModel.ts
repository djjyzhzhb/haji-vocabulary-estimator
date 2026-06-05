import { ModelParams } from '../types';

export function calculatePrimaryNewMorphemes(params: ModelParams, E_cmp: Record<number, number>, E_noR: Record<number, number>) {
  const { n, k } = params;

  let n_cmp = 0;
  let n_deriv = 0;

  for (let L = 1; L <= 4; L++) {
    const q = L === 2 ? params.q_cmp2 : L === 3 ? params.q_cmp3 : 0;
    n_cmp += (E_cmp[L] || 0) * q;
  }

  for (let L = 1; L <= 3; L++) {
    const pi_deriv = L === 1 ? 1 : L === 2 ? 2 / 3 : 1 / 3;
    const q_deriv = L === 1 ? params.q_deriv1 : L === 2 ? params.q_deriv2 : 0;
    const D_val = (E_noR[L] || 0) * k * pi_deriv;
    n_deriv += D_val * q_deriv;
  }

  return {
    n_cmp,
    n_deriv,
    n_total: n_cmp + n_deriv,
  };
}

export function calculatePrimaryExtension(params: ModelParams, n_total: number, n_cmp: number) {
  const { n, k, pi_L, pi_R, gamma1 } = params;

  const A_L = n + n_cmp;
  const A_R = 24;

  const u_L = pi_L * gamma1;
  const u_R = pi_R * gamma1;
  const w_L = pi_L;

  // ================== delta_stem 长度分布 ==================
  // m=1: L=2
  const m1_L = A_L * u_L;
  const m1_R = A_R * u_R;
  const m1_total = m1_L + m1_R;
  
  // m=2: L=3
  const m2_LL = Math.pow(A_L, 2) * Math.pow(u_L, 2);
  const m2_LR = m1_L * m1_R;
  const m2_RL = m2_LR;
  const m2_total = m2_LL + m2_LR + m2_RL;
  
  // m=3: L=4
  const m3_single = m2_LL * m1_R;
  const m3_total = 3 * m3_single;
  
  const per_stem = m1_total + m2_total + m3_total;
  const delta_stem = n_total * per_stem;

  const stem_len_dist: Record<number, number> = {
    1: 0,
    2: n_total * m1_total,
    3: n_total * m2_total,
    4: n_total * m3_total,
  };

  // ================== delta_prefix 长度分布 ==================
  const delta_m1_L = (A_L - n) * w_L * n;
  const delta_m2_LL = (Math.pow(A_L, 2) - Math.pow(n, 2)) * Math.pow(w_L, 2) * n;
  const delta_m2_LR = (A_L - n) * w_L * A_R * pi_R * n;
  const delta_m2_RL = delta_m2_LR;
  const delta_m3_single = (Math.pow(A_L, 2) - Math.pow(n, 2)) * Math.pow(w_L, 2) * A_R * pi_R * n;
  const delta_m3_total = 3 * delta_m3_single;
  const delta_prefix = delta_m1_L + delta_m2_LL + delta_m2_LR + delta_m2_RL + delta_m3_total;

  const prefix_len_dist: Record<number, number> = {
    1: 0,
    2: delta_m1_L,
    3: delta_m2_LL + delta_m2_LR + delta_m2_RL,
    4: delta_m3_total,
  };

  // ================== delta_deriv 长度分布 ==================
  // 新语素裸词干加派生后缀: 词干L=1 + 后缀 = L=2
  const delta_deriv = n_cmp * k * gamma1 + (n_total - n_cmp) * 3 * gamma1;
  const deriv_len_dist: Record<number, number> = {
    1: 0,
    2: delta_deriv,
    3: 0,
    4: 0,
  };

  // ================== delta_rederiv_stem 长度分布 ==================
  const rederiv_m1 = n_total * m1_L * k * (2 / 3) * gamma1; // m=1 L (L=2) + 后缀 -> L=3
  const rederiv_m2 = n_total * m2_LL * k * (1 / 3) * gamma1; // m=2 LL (L=3) + 后缀 -> L=4
  const delta_rederiv_stem = rederiv_m1 + rederiv_m2;

  const rederiv_stem_len_dist: Record<number, number> = {
    1: 0,
    2: 0,
    3: rederiv_m1,
    4: rederiv_m2,
  };

  // ================== delta_rederiv_prefix 长度分布 ==================
  const rederiv_prefix_m1 = delta_m1_L * k * (2 / 3); // m=1 L (L=2) + 后缀 -> L=3
  const rederiv_prefix_m2 = delta_m2_LL * k * (1 / 3); // m=2 LL (L=3) + 后缀 -> L=4
  const delta_rederiv_prefix = rederiv_prefix_m1 + rederiv_prefix_m2;

  const rederiv_prefix_len_dist: Record<number, number> = {
    1: 0,
    2: 0,
    3: rederiv_prefix_m1,
    4: rederiv_prefix_m2,
  };

  const total = delta_stem + delta_prefix + delta_deriv + delta_rederiv_stem + delta_rederiv_prefix;

  // 合并所有长度分布
  const len_dist: Record<number, number> = {
    1: stem_len_dist[1] + prefix_len_dist[1] + deriv_len_dist[1] + rederiv_stem_len_dist[1] + rederiv_prefix_len_dist[1],
    2: stem_len_dist[2] + prefix_len_dist[2] + deriv_len_dist[2] + rederiv_stem_len_dist[2] + rederiv_prefix_len_dist[2],
    3: stem_len_dist[3] + prefix_len_dist[3] + deriv_len_dist[3] + rederiv_stem_len_dist[3] + rederiv_prefix_len_dist[3],
    4: stem_len_dist[4] + prefix_len_dist[4] + deriv_len_dist[4] + rederiv_stem_len_dist[4] + rederiv_prefix_len_dist[4],
  };

  // 构成数据
  const compound_total = delta_stem + delta_prefix;
  const derivational_total = delta_deriv + delta_rederiv_stem + delta_rederiv_prefix;
  
  return {
    delta_stem,
    delta_prefix,
    delta_deriv,
    delta_rederiv_stem,
    delta_rederiv_prefix,
    total,
    per_stem_breakdown: {
      m1_L,
      m1_R,
      m1_total,
      m2_LL,
      m2_LR,
      m2_RL,
      m2_total,
      m3_single,
      m3_total,
      per_stem
    },
    1: len_dist[1],
    2: len_dist[2],
    3: len_dist[3],
    4: len_dist[4],
    composition: {
      compound: {
        delta_stem,
        delta_prefix,
        total: compound_total,
      },
      derivational: {
        delta_deriv,
        delta_rederiv_stem,
        delta_rederiv_prefix,
        total: derivational_total,
      },
    },
  };
}

export function calculateSecondaryNewMorphemes(primaryExtension: ReturnType<typeof calculatePrimaryExtension>, primaryNewMorphemes: ReturnType<typeof calculatePrimaryNewMorphemes>) {
  const part1 = primaryExtension.delta_deriv * 0.5;
  const per_stem_m1_L = primaryExtension.per_stem_breakdown.m1_L;
  const N_new = primaryNewMorphemes.n_total;
  const total_L2 = N_new * per_stem_m1_L;
  const part2 = total_L2 * 0.0025;
  const part3 = 15;
  const N2 = part1 + part2 + part3;

  return {
    N2,
    part1,
    part2,
    part3,
  };
}

export function calculateSecondaryExtension(params: ModelParams, primaryNewMorphemes: ReturnType<typeof calculatePrimaryNewMorphemes>, secondaryNewMorphemes: ReturnType<typeof calculateSecondaryNewMorphemes>) {
  const { n, pi_L, pi_R, gamma1, gamma2 } = params;

  const A_L = n + primaryNewMorphemes.n_cmp;
  const A_R = 24;
  const N2 = secondaryNewMorphemes.N2;

  const u_L2 = pi_L * gamma1 * gamma2;
  const u_R2 = pi_R * gamma1 * gamma2;
  const w_L2 = pi_L * gamma2;

  // ================== delta_stem 长度分布 ==================
  const m1_L2 = A_L * u_L2;
  const m1_R2 = A_R * u_R2;
  const m2_LL2 = Math.pow(A_L, 2) * Math.pow(u_L2, 2);
  const m2_LR2 = m1_L2 * m1_R2;
  const m2_RL2 = m2_LR2;
  const m3_single2 = m2_LL2 * m1_R2;
  const m3_total2 = 3 * m3_single2;
  const per_stem2 = m1_L2 + m1_R2 + m2_LL2 + m2_LR2 + m2_RL2 + m3_total2;
  const delta_stem = N2 * per_stem2;

  const stem2_len_dist: Record<number, number> = {
    1: 0,
    2: N2 * (m1_L2 + m1_R2),
    3: N2 * (m2_LL2 + m2_LR2 + m2_RL2),
    4: N2 * m3_total2,
  };

  // ================== delta_prefix 长度分布 ==================
  const N2_cmp = 28;
  const prefix_orig = N2_cmp * n * w_L2;
  const prefix_primary = N2_cmp * primaryNewMorphemes.n_total * (w_L2 * gamma1);
  const delta_prefix = prefix_orig + prefix_primary;

  const prefix2_len_dist: Record<number, number> = {
    1: 0,
    2: prefix_orig + prefix_primary,
    3: 0,
    4: 0,
  };

  const total = delta_stem + delta_prefix;

  const len_dist: Record<number, number> = {
    1: stem2_len_dist[1] + prefix2_len_dist[1],
    2: stem2_len_dist[2] + prefix2_len_dist[2],
    3: stem2_len_dist[3] + prefix2_len_dist[3],
    4: stem2_len_dist[4] + prefix2_len_dist[4],
  };

  // 构成数据
  const compound_total = delta_stem + delta_prefix;
  
  return {
    delta_stem,
    delta_prefix,
    total,
    per_stem2,
    1: len_dist[1],
    2: len_dist[2],
    3: len_dist[3],
    4: len_dist[4],
    composition: {
      compound: {
        delta_stem,
        delta_prefix,
        total: compound_total,
      },
      derivational: {
        total: 0,
      },
    },
  };
}
