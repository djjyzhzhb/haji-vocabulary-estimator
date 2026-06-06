import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '../../config/colors';

interface LayerData {
  synchronic: number;
  primary: number;
  secondary: number;
}

interface LayerDistributionChartProps {
  data: LayerData;
}

export const LayerDistributionChart: React.FC<LayerDistributionChartProps> = ({ data }) => {
  const chartData = [
    { name: '共时模型', value: data.synchronic },
    { name: '一级扩展', value: data.primary },
    { name: '二级扩展', value: data.secondary },
  ];

  const colors = [COLORS.synchronic, COLORS.primaryExtension, COLORS.secondaryExtension];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={90}
            innerRadius={0}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: number) => val.toLocaleString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
