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
  Cell,
} from 'recharts';
import { COLORS } from '../../config/colors';
import { CalculationResult } from '../../types';

type DisplayMode = 'linear' | 'log' | 'separate';
type LayerMode = 'synchronic' | 'primary' | 'secondary' | 'all';

interface UnifiedLengthChartProps {
  result: CalculationResult;
}

export const UnifiedLengthChart: React.FC<UnifiedLengthChartProps> = ({ result }) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('log');
  const [layerMode, setLayerMode] = useState<LayerMode>('all');

  const getChartData = () => {
    const lengths = [1, 2, 3, 4];
    
    if (layerMode === 'all') {
      return lengths.map(l => ({
        length: `L=${l}`,
        共时: result.synchronic[l],
        一级扩展: result.primaryExtension[l],
        二级扩展: result.secondaryExtension[l],
      }));
    } else if (layerMode === 'synchronic') {
      return lengths.map(l => ({
        length: `L=${l}`,
        单语素: l === 1 ? result.synchronic[1] : 0,
        复合词: result.synchronic.composition.compound[l as 2 | 3 | 4] || 0,
        派生词: result.synchronic.composition.derivational[l as 2 | 3 | 4] || 0,
      }));
    } else if (layerMode === 'primary') {
      return lengths.map(l => ({
        length: `L=${l}`,
        总计: result.primaryExtension[l],
      }));
    } else {
      return lengths.map(l => ({
        length: `L=${l}`,
        二级扩展: result.secondaryExtension[l],
      }));
    }
  };

  const getBarColors = () => {
    if (layerMode === 'all') {
      return [COLORS.synchronic, COLORS.primaryExtension, COLORS.secondaryExtension];
    } else if (layerMode === 'synchronic') {
      return [COLORS.monomorphemic, COLORS.compound, COLORS.derivational];
    } else {
      return [layerMode === 'primary' ? COLORS.primaryExtension : COLORS.secondaryExtension];
    }
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万`;
    }
    return value.toString();
  };

  const renderSeparateMode = () => {
    const chartData = getChartData();
    return (
      <div className="grid grid-cols-2 gap-4">
        {chartData.map((item, idx) => {
          const separateData = Object.entries(item)
            .filter(([key]) => key !== 'length')
            .map(([name, value]) => ({ name, value: value as number }));
          const maxVal = Math.max(...separateData.map(d => d.value), 1);
          return (
            <div key={idx} className="bg-slate-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">{item.length}</h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={separateData}
                    layout="vertical"
                    margin={{ left: 5, right: 20, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      type="number" 
                      tickFormatter={formatYAxis} 
                      tick={{ fontSize: 9 }}
                      domain={[0, maxVal * 1.1]}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={65} 
                      tick={{ fontSize: 10 }}
                      interval={0}
                    />
                    <Tooltip 
                      formatter={(val: number) => val.toLocaleString()}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                    <Bar 
                      dataKey="value"
                      radius={[0, 3, 3, 0]} 
                    >
                      {separateData.map((_, i) => (
                        <Cell 
                          key={`cell-${idx}-${i}`} 
                          fill={getBarColors()[i % getBarColors().length] || COLORS.synchronic} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderChart = () => {
    let chartData = getChartData();
    
    // 对数模式下，将0值替换为1避免对数计算错误
    if (displayMode === 'log') {
      chartData = chartData.map(d => {
        const newData: any = { ...d };
        Object.keys(newData).forEach(key => {
          if (key !== 'length' && typeof newData[key] === 'number') {
            newData[key] = newData[key] > 0 ? newData[key] : 1;
          }
        });
        return newData;
      });
    }
    
    return (
      <BarChart 
        data={chartData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="30%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="length" stroke="#64748b" tick={{ fontSize: 12 }} height={40} />
        <YAxis 
          stroke="#64748b" 
          tickFormatter={formatYAxis} 
          tick={{ fontSize: 12 }} 
          width={70}
          scale={displayMode === 'log' ? 'log' : 'linear'}
          domain={displayMode === 'log' ? [1, 'auto'] : undefined}
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
        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
        
        {layerMode === 'all' && (
          <>
            <Bar dataKey="共时" fill={COLORS.synchronic} radius={[4, 4, 0, 0]} />
            <Bar dataKey="一级扩展" fill={COLORS.primaryExtension} radius={[4, 4, 0, 0]} />
            <Bar dataKey="二级扩展" fill={COLORS.secondaryExtension} radius={[4, 4, 0, 0]} />
          </>
        )}
        {layerMode === 'synchronic' && (
          <>
            <Bar dataKey="单语素" fill={COLORS.monomorphemic} radius={[4, 4, 0, 0]} />
            <Bar dataKey="复合词" fill={COLORS.compound} radius={[4, 4, 0, 0]} />
            <Bar dataKey="派生词" fill={COLORS.derivational} radius={[4, 4, 0, 0]} />
          </>
        )}
        {layerMode === 'primary' && (
          <Bar dataKey="总计" fill={COLORS.primaryExtension} radius={[4, 4, 0, 0]} />
        )}
        {layerMode === 'secondary' && (
          <Bar dataKey="二级扩展" fill={COLORS.secondaryExtension} radius={[4, 4, 0, 0]} />
        )}
      </BarChart>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            显示模式:
          </span>
          <div className="flex gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-1.5 border border-blue-100 shadow-inner">
            <button
              onClick={() => setDisplayMode('linear')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                displayMode === 'linear'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              线性
            </button>
            <button
              onClick={() => setDisplayMode('log')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                displayMode === 'log'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              对数
            </button>
            <button
              onClick={() => setDisplayMode('separate')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                displayMode === 'separate'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              分拆
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            显示层级:
          </span>
          <div className="flex flex-wrap gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-1.5 border border-emerald-100 shadow-inner">
            <button
              onClick={() => setLayerMode('synchronic')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                layerMode === 'synchronic'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
              }`}
            >
              共时模型
            </button>
            <button
              onClick={() => setLayerMode('primary')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                layerMode === 'primary'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
              }`}
            >
              一级扩展
            </button>
            <button
              onClick={() => setLayerMode('secondary')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                layerMode === 'secondary'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
              }`}
            >
              二级扩展
            </button>
            <button
              onClick={() => setLayerMode('all')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                layerMode === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md transform scale-105'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
              }`}
            >
              全部对比
            </button>
          </div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {displayMode === 'separate' ? renderSeparateMode() : renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
