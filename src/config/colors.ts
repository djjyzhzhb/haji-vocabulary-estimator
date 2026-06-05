// 统一颜色系统 - 所有图表使用相同的颜色映射
export const COLORS = {
  // 层级颜色
  synchronic: '#3b82f6',      // 蓝色 - 共时模型
  primaryExtension: '#10b981', // 翠绿 - 一级扩展
  secondaryExtension: '#f59e0b', // 琥珀色 - 二级扩展
  
  // 词类型颜色
  monomorphemic: '#3b82f6',   // 蓝色 - 单语素词
  compound: '#10b981',        // 翠绿 - 复合词
  derivational: '#f59e0b',    // 琥珀色 - 派生词
  
  // 词长度颜色
  length1: '#3b82f6',         // 蓝色 - L=1
  length2: '#10b981',         // 翠绿 - L=2
  length3: '#f59e0b',         // 琥珀色 - L=3
  length4: '#8b5cf6',         // 紫色 - L=4
  
  // 构成方式颜色
  compoundFormation: '#10b981',     // 复合构词
  derivationalFormation: '#f59e0b', // 派生构词
  
  // 扩展内部构成
  deltaStem: '#3b82f6',       // 新语素词干复合
  deltaPrefix: '#10b981',     // 前置池扩大
  deltaDeriv: '#f59e0b',      // 新语素派生
  deltaReDerivStem: '#8b5cf6',  // 新语素再派生
  deltaReDerivPrefix: '#ec4899', // 原始再派生
};
