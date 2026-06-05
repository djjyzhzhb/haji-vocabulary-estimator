import React from 'react';
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

interface WordTypeChartProps {
  result: CalculationResult;
}

export const WordTypeChart: React.FC<WordTypeChartProps> = ({ result }) => {
  const chartData = [
    {
      category: '共时',
      单语素: result.synchronic.composition.monomorphemic,
      复合词: result.synchronic.composition.compound.total,
      派生词: result.synchronic.composition.derivational.total,
    },
    {
      category: '一级扩展',
      单语素: result.primaryExtension[1],
      复合词: result.primaryExtension.composition.compound.total,
      派生词: result.primaryExtension.composition.derivational.total,
    },
    {
      category: '二级扩展',
      单语素: result.secondaryExtension[1],
      复合词: result.secondaryExtension.composition.compound.total,
      派生词: result.secondaryExtension.composition.derivational.total,
    },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="category" stroke="#64748b" />
          <YAxis stroke="#64748b" tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="单语素" fill={COLORS.monomorphemic} stackId="a" />
          <Bar dataKey="复合词" fill={COLORS.compound} stackId="a" />
          <Bar dataKey="派生词" fill={COLORS.derivational} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
