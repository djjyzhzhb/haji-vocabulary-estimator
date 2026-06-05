import React, { useState, useEffect } from 'react';
import { TrendingUp, Gauge, ArrowUp, ArrowDown } from 'lucide-react';
import { useAppStore } from '../store';
import { calculateSensitivity, calculateAllSensitivities } from '../services/sensitivityService';
import { PARAM_INFO } from '../config/params';
import { SensitivityChart } from '../components/charts/SensitivityChart';

const Sensitivity: React.FC = () => {
  const { params } = useAppStore();
  const [selectedParam, setSelectedParam] = useState<string>('n');
  const [sensitivityData, setSensitivityData] = useState<any>(null);
  const [allSensitivities, setAllSensitivities] = useState<any[]>([]);

  useEffect(() => {
    const data = calculateSensitivity(params, selectedParam);
    setSensitivityData(data);

    const allData = calculateAllSensitivities(params);
    setAllSensitivities(allData);
  }, [params, selectedParam]);

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">敏感性分析</h1>
        <p className="text-slate-500">分析参数变化对总词汇量的影响</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              敏感性曲线
            </h3>
            <select
              value={selectedParam}
              onChange={(e) => setSelectedParam(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(PARAM_INFO).map((key) => (
                <option key={key} value={key}>
                  {PARAM_INFO[key as keyof typeof PARAM_INFO].label}
                </option>
              ))}
            </select>
          </div>
          {sensitivityData && (
            <div className="space-y-4">
              <SensitivityChart data={sensitivityData} />
              <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gauge className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-600">弹性系数:</span>
                  <span className="text-lg font-bold text-blue-700">
                    {sensitivityData.elasticity.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {sensitivityData.elasticity > 0 ? (
                    <ArrowUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-slate-600">
                    {sensitivityData.elasticity > 0 ? '正相关' : '负相关'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-500" />
            参数影响排序
          </h3>
          <div className="space-y-3">
            {allSensitivities.map((item, index) => {
              const absElasticity = Math.abs(item.elasticity);
              let color = 'blue';
              if (absElasticity > 5) color = 'red';
              else if (absElasticity > 2) color = 'orange';
              else if (absElasticity > 0.5) color = 'yellow';

              return (
                <div
                  key={item.param}
                  onClick={() => setSelectedParam(item.param)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedParam === item.param
                      ? 'bg-blue-50 border-2 border-blue-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {PARAM_INFO[item.param as keyof typeof PARAM_INFO].label}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        color === 'red'
                          ? 'text-red-600'
                          : color === 'orange'
                          ? 'text-orange-600'
                          : color === 'yellow'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {item.elasticity.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        color === 'red'
                          ? 'bg-red-500'
                          : color === 'orange'
                          ? 'bg-orange-500'
                          : color === 'yellow'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(absElasticity * 10, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensitivity;
