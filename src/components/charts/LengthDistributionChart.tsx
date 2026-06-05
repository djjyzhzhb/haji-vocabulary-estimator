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

interface LengthData {
  synchronic: number[];
  primary: number[];
  secondary: number[];
}

interface LengthDistributionChartProps {
  data: LengthData;
}

export const LengthDistributionChart: React.FC<LengthDistributionChartProps> = ({ data }) => {
  const chartData = [
    { length: 'L=1', 共时: data.synchronic[0], 一级扩展: data.primary[0], 二级扩展: data.secondary[0] },
    { length: 'L=2', 共时: data.synchronic[1], 一级扩展: data.primary[1], 二级扩展: data.secondary[1] },
    { length: 'L=3', 共时: data.synchronic[2], 一级扩展: data.primary[2], 二级扩展: data.secondary[2] },
    { length: 'L=4', 共时: data.synchronic[3], 一级扩展: data.primary[3], 二级扩展: data.secondary[3] },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="length" stroke="#64748b" />
          <YAxis stroke="#64748b" tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
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
          <Bar dataKey="共时" fill={COLORS.synchronic} radius={[4, 4, 0, 0]} />
          <Bar dataKey="一级扩展" fill={COLORS.primaryExtension} radius={[4, 4, 0, 0]} />
          <Bar dataKey="二级扩展" fill={COLORS.secondaryExtension} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
