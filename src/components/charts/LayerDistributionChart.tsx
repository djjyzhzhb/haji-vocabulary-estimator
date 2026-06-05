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
      <style dangerouslySetInnerHTML={{__html: `
        /* 彻底禁用所有默认 outline，只保留 Tooltip */
        .recharts-pie-sector {
          outline: none !important;
          outline-width: 0 !important;
          outline-style: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        .recharts-pie-sector:focus,
        .recharts-pie-sector:active,
        .recharts-pie-sector:focus-visible {
          outline: none !important;
          outline-width: 0 !important;
          outline-style: none !important;
          box-shadow: none !important;
        }
        
        .recharts-wrapper svg {
          outline: none !important;
        }
        
        .recharts-wrapper * {
          outline: none !important;
        }
      `}} />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
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
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
