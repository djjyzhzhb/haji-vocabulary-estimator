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

type YAxisMode = 'linear' | 'log' | 'separate';

interface LengthData {
  synchronic: number[];
  primary: number[];
  secondary: number[];
}

interface EnhancedLengthDistributionChartProps {
  data: LengthData;
}

export const EnhancedLengthDistributionChart: React.FC<EnhancedLengthDistributionChartProps> = ({ data }) => {
  const [yAxisMode, setYAxisMode] = useState<YAxisMode>('linear');

  const chartData = [
    { length: 'L=1', 共时: data.synchronic[0], 一级扩展: data.primary[0], 二级扩展: data.secondary[0] },
    { length: 'L=2', 共时: data.synchronic[1], 一级扩展: data.primary[1], 二级扩展: data.secondary[1] },
    { length: 'L=3', 共时: data.synchronic[2], 一级扩展: data.primary[2], 二级扩展: data.secondary[2] },
    { length: 'L=4', 共时: data.synchronic[3], 一级扩展: data.primary[3], 二级扩展: data.secondary[3] },
  ];

  const formatYAxis = (value: number) => {
    if (yAxisMode === 'log') {
      if (value === 0) return '0';
      return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString();
    }
    return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString();
  };

  const renderLinearChart = () => (
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="length" stroke="#64748b" />
      <YAxis stroke="#64748b" tickFormatter={formatYAxis} />
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
  );

  const renderLogChart = () => {
    // 为对数轴添加一个小偏移避免0值问题
    const logData = chartData.map(d => ({
      ...d,
      共时: d.共时 > 0 ? d.共时 : 1,
      一级扩展: d.一级扩展 > 0 ? d.一级扩展 : 1,
      二级扩展: d.二级扩展 > 0 ? d.二级扩展 : 1,
    }));

    return (
      <BarChart data={logData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="length" stroke="#64748b" />
        <YAxis stroke="#64748b" scale="log" domain={['auto', 'auto']} tickFormatter={formatYAxis} />
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
    );
  };

  // 修改架构，分离单独模式到外层
  const renderSeparateMode = () => (
    <div className="h-full grid grid-cols-2 gap-4">
      {['L=1', 'L=2', 'L=3', 'L=4'].map((length, idx) => {
        const lengthData = chartData[idx];
        const separateData = [
          { name: '共时', value: lengthData.共时 },
          { name: '一级扩展', value: lengthData.一级扩展 },
          { name: '二级扩展', value: lengthData.二级扩展 },
        ];

        return (
          <div key={length} className="bg-slate-50 rounded-xl p-3 flex flex-col">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">{length}</h4>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={separateData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" tickFormatter={formatYAxis} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" width={60} />
                  <Tooltip
                    formatter={(val: number) => val.toLocaleString()}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="value" fill={COLORS.synchronic} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-slate-600">显示模式:</span>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setYAxisMode('linear')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              yAxisMode === 'linear'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            线性
          </button>
          <button
            onClick={() => setYAxisMode('log')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              yAxisMode === 'log'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            对数
          </button>
          <button
            onClick={() => setYAxisMode('separate')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              yAxisMode === 'separate'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            分拆
          </button>
        </div>
      </div>

      {yAxisMode === 'separate' ? (
        <div className="h-80">{renderSeparateMode()}</div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {yAxisMode === 'linear' ? renderLinearChart() : renderLogChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
