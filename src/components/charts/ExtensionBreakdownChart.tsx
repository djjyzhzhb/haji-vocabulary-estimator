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

interface ExtensionBreakdownChartProps {
  result: CalculationResult;
}

export const ExtensionBreakdownChart: React.FC<ExtensionBreakdownChartProps> = ({ result }) => {
  const chartData = [
    {
      name: '一级扩展',
      新语素词干: result.primaryExtension.delta_stem,
      前置池扩展: result.primaryExtension.delta_prefix,
      新语素派生: result.primaryExtension.delta_deriv,
      复合词干再派生: result.primaryExtension.delta_rederiv_stem,
      原始再派生: result.primaryExtension.delta_rederiv_prefix,
    },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
          <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
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
          <Bar dataKey="新语素词干" fill={COLORS.deltaStem} radius={[0, 4, 4, 0]} />
          <Bar dataKey="前置池扩展" fill={COLORS.deltaPrefix} radius={[0, 4, 4, 0]} />
          <Bar dataKey="新语素派生" fill={COLORS.deltaDeriv} radius={[0, 4, 4, 0]} />
          <Bar dataKey="复合词干再派生" fill={COLORS.deltaReDerivStem} radius={[0, 4, 4, 0]} />
          <Bar dataKey="原始再派生" fill={COLORS.deltaReDerivPrefix} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
