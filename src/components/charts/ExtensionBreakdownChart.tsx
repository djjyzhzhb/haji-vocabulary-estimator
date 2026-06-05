import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { COLORS } from '../../config/colors';
import { CalculationResult } from '../../types';

interface ExtensionBreakdownChartProps {
  result: CalculationResult;
}

export const ExtensionBreakdownChart: React.FC<ExtensionBreakdownChartProps> = ({ result }) => {
  const chartData = [
    { name: '新语素词干', value: result.primaryExtension.delta_stem, fill: COLORS.deltaStem },
    { name: '前置池扩展', value: result.primaryExtension.delta_prefix, fill: COLORS.deltaPrefix },
    { name: '新语素派生', value: result.primaryExtension.delta_deriv, fill: COLORS.deltaDeriv },
    { name: '复合词干再派生', value: result.primaryExtension.delta_rederiv_stem, fill: COLORS.deltaReDerivStem },
    { name: '原始再派生', value: result.primaryExtension.delta_rederiv_prefix, fill: COLORS.deltaReDerivPrefix },
  ];

  const formatXAxis = (val: number) => {
    if (val >= 10000) return `${(val / 10000).toFixed(1)}万`;
    return val.toString();
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" tickFormatter={formatXAxis} tick={{ fontSize: 12 }} />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#64748b" 
            width={100} 
            tick={{ fontSize: 11 }}
            interval={0}
          />
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
