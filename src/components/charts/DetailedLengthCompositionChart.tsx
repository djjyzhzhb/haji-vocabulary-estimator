import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '../../config/colors';
import { CalculationResult } from '../../types';

type ViewType = 'synchronic' | 'primary' | 'secondary' | 'all';

interface DetailedLengthCompositionChartProps {
  result: CalculationResult;
}

export const DetailedLengthCompositionChart: React.FC<DetailedLengthCompositionChartProps> = ({ result }) => {
  const [viewType, setViewType] = useState<ViewType>('synchronic');

  // 共时模型详细构成
  const synchronicData = [
    {
      length: 'L=1',
      单语素: result.synchronic[1],
    },
    {
      length: 'L=2',
      复合词: result.synchronic.composition.compound.len2,
      派生词: result.synchronic.composition.derivational.len2,
    },
    {
      length: 'L=3',
      复合词: result.synchronic.composition.compound.len3,
      派生词: result.synchronic.composition.derivational.len3,
    },
    {
      length: 'L=4',
      复合词: result.synchronic.composition.compound.len4,
      派生词: result.synchronic.composition.derivational.len4,
    },
  ];

  // 一级扩展构成 (内部按复合/派生)
  const primaryData = [
    {
      length: 'L=1',
      总计: result.primaryExtension[1],
    },
    {
      length: 'L=2',
      复合词: result.primaryExtension.composition.compound.delta_stem + result.primaryExtension.composition.compound.delta_prefix,
      派生词: result.primaryExtension.composition.derivational.delta_deriv + result.primaryExtension.composition.derivational.delta_rederiv_stem + result.primaryExtension.composition.derivational.delta_rederiv_prefix,
    },
    {
      length: 'L=3',
      总计: result.primaryExtension[3],
    },
    {
      length: 'L=4',
      总计: result.primaryExtension[4],
    },
  ];

  // 简化版：直接显示各层级在各L下的总数据
  const allData = [
    {
      length: 'L=1',
      共时: result.synchronic[1],
      一级扩展: result.primaryExtension[1],
      二级扩展: result.secondaryExtension[1],
    },
    {
      length: 'L=2',
      共时: result.synchronic[2],
      一级扩展: result.primaryExtension[2],
      二级扩展: result.secondaryExtension[2],
    },
    {
      length: 'L=3',
      共时: result.synchronic[3],
      一级扩展: result.primaryExtension[3],
      二级扩展: result.secondaryExtension[3],
    },
    {
      length: 'L=4',
      共时: result.synchronic[4],
      一级扩展: result.primaryExtension[4],
      二级扩展: result.secondaryExtension[4],
    },
  ];

  const renderChart = () => {
    if (viewType === 'all') {
      return (
        <BarChart data={allData} barCategoryGap="30%" barGap={2} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="length" stroke="#64748b" tick={{ fontSize: 12 }} height={40} />
          <YAxis stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} tick={{ fontSize: 12 }} width={60} />
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
          <Bar dataKey="共时" fill={COLORS.synchronic} radius={[4, 4, 0, 0]} />
          <Bar dataKey="一级扩展" fill={COLORS.primaryExtension} radius={[4, 4, 0, 0]} />
          <Bar dataKey="二级扩展" fill={COLORS.secondaryExtension} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    if (viewType === 'synchronic') {
      return (
        <BarChart data={synchronicData} barCategoryGap="30%" barGap={2} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="length" stroke="#64748b" tick={{ fontSize: 12 }} height={40} />
          <YAxis stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} tick={{ fontSize: 12 }} width={60} />
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
          <Bar dataKey="单语素" fill={COLORS.monomorphemic} radius={[4, 4, 0, 0]} />
          <Bar dataKey="复合词" fill={COLORS.compound} radius={[4, 4, 0, 0]} />
          <Bar dataKey="派生词" fill={COLORS.derivational} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    if (viewType === 'primary') {
      return (
        <BarChart data={primaryData} barCategoryGap="30%" barGap={2} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="length" stroke="#64748b" tick={{ fontSize: 12 }} height={40} />
          <YAxis stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} tick={{ fontSize: 12 }} width={60} />
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
          <Bar dataKey="总计" fill={COLORS.primaryExtension} radius={[4, 4, 0, 0]} />
          <Bar dataKey="复合词" fill={COLORS.compound} radius={[4, 4, 0, 0]} />
          <Bar dataKey="派生词" fill={COLORS.derivational} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    // 二级扩展
    return (
      <BarChart data={allData.map(d => ({
        length: d.length,
        二级扩展: d.二级扩展
      }))} barCategoryGap="30%" barGap={2} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="length" stroke="#64748b" tick={{ fontSize: 12 }} height={40} />
        <YAxis stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} tick={{ fontSize: 12 }} width={60} />
        <Tooltip
          formatter={(val: number) => val.toLocaleString()}
          contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
        <Bar dataKey="二级扩展" fill={COLORS.secondaryExtension} radius={[4, 4, 0, 0]} />
      </BarChart>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          显示层级:
        </span>
        <div className="flex flex-wrap gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-1.5 border border-emerald-100 shadow-inner">
          <button
            onClick={() => setViewType('synchronic')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              viewType === 'synchronic'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
            }`}
          >
            共时模型
          </button>
          <button
            onClick={() => setViewType('primary')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              viewType === 'primary'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
            }`}
          >
            一级扩展
          </button>
          <button
            onClick={() => setViewType('secondary')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              viewType === 'secondary'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
            }`}
          >
            二级扩展
          </button>
          <button
            onClick={() => setViewType('all')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              viewType === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
            }`}
          >
            全部对比
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
