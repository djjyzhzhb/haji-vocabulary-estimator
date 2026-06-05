import { ModelParams } from '../types';

interface ParamInfo {
  label: string;
  desc: string;
  min: number;
  max: number;
  step: number;
}

export const PARAM_INFO: Record<keyof ModelParams, ParamInfo> = {
  n: { label: '原始语素 n', desc: '词汇学上的基本词汇单位数量', min: 50, max: 500, step: 1 },
  k: { label: '派生后缀 k', desc: '派生词缀的类型数', min: 1, max: 20, step: 1 },
  pi_L: { label: '前置能产性 π_L', desc: '前缀在复合词中的能产程度', min: 0, max: 0.5, step: 0.01 },
  pi_R: { label: '后置能产性 π_R', desc: '后缀在复合词中的能产程度', min: 0, max: 1, step: 0.01 },
  q_cmp2: { label: '复合融合率 q_cmp2', desc: '长度为2的复合词融合概率', min: 0, max: 0.1, step: 0.001 },
  q_cmp3: { label: '三语素融合率 q_cmp3', desc: '长度为3的复合词融合概率', min: 0, max: 0.01, step: 0.0001 },
  q_deriv1: { label: 'L1派生融合率 q_deriv1', desc: '长度为1的派生词融合概率', min: 0, max: 1, step: 0.01 },
  q_deriv2: { label: 'L2派生融合率 q_deriv2', desc: '长度为2的派生词融合概率', min: 0, max: 0.1, step: 0.001 },
  gamma1: { label: '一级扩展折扣 γ1', desc: '一级扩展中新语素的折扣系数', min: 0, max: 1, step: 0.01 },
  gamma2: { label: '二级扩展折扣 γ2', desc: '二级扩展中新语素的折扣系数', min: 0, max: 1, step: 0.01 },
};

export const PARAM_CONFIGS = {
  basic: {
    label: '基础参数',
    params: ['n', 'k'] as const,
  },
  productivity: {
    label: '能产性参数',
    params: ['pi_L', 'pi_R'] as const,
  },
  compound: {
    label: '复合词参数',
    params: ['q_cmp2', 'q_cmp3'] as const,
  },
  derivation: {
    label: '派生词参数',
    params: ['q_deriv1', 'q_deriv2'] as const,
  },
  extension: {
    label: '扩展模型参数',
    params: ['gamma1', 'gamma2'] as const,
  },
};
