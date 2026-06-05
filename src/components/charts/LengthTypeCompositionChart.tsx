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

interface LengthTypeCompositionChartProps {
  result: CalculationResult;
}

export const LengthTypeCompositionChart: React.FC<LengthTypeCompositionChartProps> = ({ result }) => {
  // 为每个L构建数据
  const chartData = [
    {
      length: 'L=1',
      // 共时模型的L=1
      共时_单语素: result.synchronic[1],
      // 一级扩展的L=1
      一级_单语素: result.primaryExtension[1],
      // 二级扩展的L=1
      二级_单语素: result.secondaryExtension[1],
    },
    {
      length: 'L=2',
      共时_复合: result.synchronic.composition.compound.len2,
      共时_派生: result.synchronic.composition.derivational.len2,
      // 注意：一级和二级扩展的L=2可能包含复合和派生，但我们按层级显示
      一级_总计: result.primaryExtension[2],
      二级_总计: result.secondaryExtension[2],
    },
    {
      length: 'L=3',
      共时_复合: result.synchronic.composition.compound.len3,
      共时_派生: result.synchronic.composition.derivational.len3,
      一级_总计: result.primaryExtension[3],
      二级_总计: result.secondaryExtension[3],
    },
    {
      length: 'L=4',
      共时_复合: result.synchronic.composition.compound.len4,
      共时_派生: result.synchronic.composition.derivational.len4,
      一级_总计: result.primaryExtension[4],
      二级_总计: result.secondaryExtension[4],
    },
  ];

  // 简化版：为了清晰，我们分别显示各层级在各L下的总数据
  const simplifiedData = [
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

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={simplifiedData} barCategoryGap="30%" barGap={2}>
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
