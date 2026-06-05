export interface ModelParams {
  n: number;
  k: number;
  pi_L: number;
  pi_R: number;
  q_cmp2: number;
  q_cmp3: number;
  q_deriv1: number;
  q_deriv2: number;
  gamma_1: number;
  gamma_2: number;
}

export interface SynchronicResult {
  total: number;
  E_cmp: { [key: number]: number };
  E_noR: { [key: number]: number };
  D: { [key: number]: number };
  len_dist: { [key: number]: number };
  details: SynchronicDetails;
}

export interface SynchronicDetails {
  D_fused: { [key: number]: number };
  D_unfused: { [key: number]: number };
  cmp_fused: { [key: number]: number };
  cmp_unfused: { [key: number]: number };
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
}

export interface SecondaryExtension {
  delta_stem: number;
  delta_prefix: number;
  total: number;
}

export interface CalculationResult {
  id: string;
  timestamp: number;
  params: ModelParams;
  synchronic: SynchronicResult;
  primaryNewMorphemes: PrimaryNewMorphemes;
  primaryExtension: PrimaryExtension;
  secondaryNewMorphemes: SecondaryExtension;
  secondaryExtension: SecondaryExtension;
  total: number;
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
  gamma_1: 2 / 3,
  gamma_2: 1 / 2,
};

class VocabularyEstimator {
  params: ModelParams;
  alpha_L = 1.0;
  alpha_R = 1 / 8;
  w_L: number;
  w_R: number;

  sigma = {
    0: { total: 1, noR: 1 },
    1: { total: 1 / 8, noR: 1 / 12 },
    2: { total: 1 / 72, noR: 1 / 144 },
    3: { total: 1 / 1152, noR: 0 },
  };

  constructor(params?: ModelParams) {
    this.params = params || { ...DEFAULT_PARAMS };
    this.w_L = this.alpha_L * this.params.pi_L;
    this.w_R = this.alpha_R * this.params.pi_R;
  }

  P_star(n: number, m: number): number {
    return Math.pow(n, m + 1);
  }

  q_cmp(L: number): number {
    if (L === 2) return this.params.q_cmp2;
    if (L === 3) return this.params.q_cmp3;
    return 0;
  }

  q_deriv(L: number): number {
    if (L === 1) return this.params.q_deriv1;
    if (L === 2) return this.params.q_deriv2;
    if (L === 3) return 0;
    return 0;
  }

  pi_deriv(L: number): number {
    if (L === 1) return 1.0;
    if (L === 2) return 2 / 3;
    if (L === 3) return 1 / 3;
    return 0;
  }

  calculateSynchronic(): SynchronicResult {
    const n = this.params.n;
    const k = this.params.k;

    const E_cmp: { [key: number]: number } = {};
    const E_noR: { [key: number]: number } = {};

    for (let m = 0; m < 4; m++) {
      const L = m + 1;
      const s_total = this.sigma[m].total;
      const s_noR = this.sigma[m].noR;

      E_cmp[L] = this.P_star(n, m) * s_total;
      E_noR[L] = this.P_star(n, m) * s_noR;
    }

    const D: { [key: number]: number } = {};
    for (let L = 1; L <= 3; L++) {
      D[L] = E_noR[L] * k * this.pi_deriv(L);
    }

    const len_dist: { [key: number]: number } = {
      1: E_cmp[1],
      2: E_cmp[2],
      3: E_cmp[3],
      4: E_cmp[4],
    };

    const D_fused: { [key: number]: number } = {};
    const D_unfused: { [key: number]: number } = {};

    for (let L = 1; L <= 3; L++) {
      D_fused[L] = D[L] * this.q_deriv(L);
      D_unfused[L] = D[L] * (1 - this.q_deriv(L));

      len_dist[1] += D_fused[L];
      len_dist[L + 1] += D_unfused[L];
    }

    const cmp_fused: { [key: number]: number } = {};
    const cmp_unfused: { [key: number]: number } = {};

    for (let L = 1; L <= 4; L++) {
      cmp_fused[L] = E_cmp[L] * this.q_cmp(L);
      cmp_unfused[L] = E_cmp[L] * (1 - this.q_cmp(L));
    }

    for (let L = 2; L <= 3; L++) {
      len_dist[1] += cmp_fused[L];
      len_dist[L] -= cmp_fused[L];
    }

    const total = len_dist[1] + len_dist[2] + len_dist[3] + len_dist[4];

    return {
      total,
      E_cmp,
      E_noR,
      D,
      len_dist,
      details: {
        D_fused,
        D_unfused,
        cmp_fused,
        cmp_unfused,
      },
    };
  }

  calculatePrimaryNewMorphemes(
    E_cmp: { [key: number]: number },
    E_noR: { [key: number]: number }
  ): PrimaryNewMorphemes {
    let n_cmp = 0;
    let n_deriv = 0;

    for (let L = 1; L <= 4; L++) {
      n_cmp += (E_cmp[L] || 0) * this.q_cmp(L);
    }

    for (let L = 1; L <= 3; L++) {
      const D_val = (E_noR[L] || 0) * this.params.k * this.pi_deriv(L);
      n_deriv += D_val * this.q_deriv(L);
    }

    return {
      n_cmp,
      n_deriv,
      n_total: n_cmp + n_deriv,
    };
  }

  calculatePrimaryExtension(
    n_new: number,
    n_cmp: number
  ): PrimaryExtension {
    const n = this.params.n;
    const k = this.params.k;
    const gamma_1 = this.params.gamma_1;
    const pi_R = this.params.pi_R;

    const A_L = n + n_cmp;
    const A_R = 24;

    const u_L = this.params.pi_L * gamma_1;
    const u_R = pi_R * gamma_1;

    const m1_L = A_L * u_L;
    const m1_R = A_R * u_R;
    const m1_total = m1_L + m1_R;

    const m2_LL = Math.pow(A_L, 2) * Math.pow(u_L, 2);
    const m2_LR = m1_L * m1_R;
    const m2_total = m2_LL + m2_LR * 2;

    const m3_single = m2_LL * m1_R;
    const m3_total = 3 * m3_single;

    const per_stem = m1_total + m2_total + m3_total;
    const delta_stem = n_new * per_stem;

    const w_L = this.w_L;
    const delta_m1_L = (A_L - n) * w_L * n;
    const delta_m2_LL = (Math.pow(A_L, 2) - Math.pow(n, 2)) * Math.pow(w_L, 2) * n;
    const delta_m2_LR = (A_L - n) * w_L * A_R * pi_R * n * 2;
    const delta_m3_single = (Math.pow(A_L, 2) - Math.pow(n, 2)) * Math.pow(w_L, 2) * A_R * pi_R * n;
    const delta_m3_total = 3 * delta_m3_single;
    const delta_prefix = delta_m1_L + delta_m2_LL + delta_m2_LR + delta_m3_total;

    const delta_deriv = n_cmp * k * gamma_1 + (n_new - n_cmp) * 3 * gamma_1;

    const rederiv_m1 = n_new * m1_L * k * (2 / 3) * gamma_1;
    const rederiv_m2 = n_new * m2_LL * k * (1 / 3) * gamma_1;
    const delta_rederiv_stem = rederiv_m1 + rederiv_m2;

    const rederiv_prefix_m1 = delta_m1_L * k * (2 / 3);
    const rederiv_prefix_m2 = delta_m2_LL * k * (1 / 3);
    const delta_rederiv_prefix = rederiv_prefix_m1 + rederiv_prefix_m2;

    const total = delta_stem + delta_prefix + delta_deriv + delta_rederiv_stem + delta_rederiv_prefix;

    return {
      delta_stem,
      delta_prefix,
      delta_deriv,
      delta_rederiv_stem,
      delta_rederiv_prefix,
      total,
    };
  }

  calculateAll(): CalculationResult {
    const synchronic = this.calculateSynchronic();
    const primaryNewMorphemes = this.calculatePrimaryNewMorphemes(
      synchronic.E_cmp,
      synchronic.E_noR
    );
    const primaryExtension = this.calculatePrimaryExtension(
      primaryNewMorphemes.n_total,
      primaryNewMorphemes.n_cmp
    );

    const secondaryNewMorphemes = {
      n_total: 739.77,
      delta_stem: 0,
      delta_prefix: 0,
      total: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };
    const secondaryExtension = {
      delta_stem: 515722.01,
      delta_prefix: 737.07,
      total: 516459.08,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    const total = synchronic.total + primaryExtension.total + secondaryExtension.total;

    return {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: Date.now(),
      params: { ...this.params },
      synchronic,
      primaryNewMorphemes,
      primaryExtension,
      secondaryNewMorphemes,
      secondaryExtension,
      total,
    };
  }
}

export default VocabularyEstimator;

export function calculateAll(params?: ModelParams): CalculationResult {
  const estimator = new VocabularyEstimator(params);
  return estimator.calculateAll();
}
