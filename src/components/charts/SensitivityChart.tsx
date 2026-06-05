import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { PARAM_INFO } from '../../config/params';

interface SensitivityChartProps {
  data: any;
}

export const SensitivityChart: React.FC<SensitivityChartProps> = ({ data }) => {
  const chartData = data.points.map((point: any) => ({
    param: point.value,
    total: point.result,
  }));

  const baseIndex = Math.floor(chartData.length / 2);
  const basePoint = chartData[baseIndex];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="param"
            stroke="#64748b"
            tickFormatter={(val) => val.toFixed(2)}
          />
          <YAxis
            stroke="#64748b"
            tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val}
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
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          {basePoint && (
            <ReferenceDot
              x={basePoint.param}
              y={basePoint.total}
              r={6}
              fill="#ef4444"
              stroke="#fff"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
