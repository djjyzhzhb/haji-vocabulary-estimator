import React, { useState, useMemo } from "react";
import { TrendingUp, ArrowRight, Settings2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppStore } from "../store/useAppStore";
import { ModelParams, calculateAll } from "../utils/calculator";

const Analysis: React.FC = () => {
  const [selectedParam, setSelectedParam] = useState<keyof ModelParams>("n");
  const [paramRange, setParamRange] = useState({ min: 50, max: 500, step: 10 });
  
  const { params } = useAppStore();

  const analysisData = useMemo(() => {
    const data = [];
    for (let val = paramRange.min; val <= paramRange.max; val += paramRange.step) {
      const modifiedParams: ModelParams = { ...params, [selectedParam]: val };
      const result = calculateAll(modifiedParams);
      data.push({
        value: val,
        total: result.total,
        synchronic: result.synchronic.total,
        primary: result.primaryExtension.total,
        secondary: result.secondaryExtension.total
      });
    }
    return data;
  }, [selectedParam, paramRange, params]);

  const paramOptions: { key: keyof ModelParams; label: string; defaultMin: number; defaultMax: number; defaultStep: number }[] = [
    { key: "n", label: "原始语素 n", defaultMin: 50, defaultMax: 500, defaultStep: 10 },
    { key: "k", label: "派生后缀 k", defaultMin: 1, defaultMax: 10, defaultStep: 1 },
    { key: "pi_L", label: "前置能产性 π_L", defaultMin: 0.01, defaultMax: 0.3, defaultStep: 0.01 },
    { key: "q_cmp2", label: "复合融合 q_cmp2", defaultMin: 0, defaultMax: 0.1, defaultStep: 0.005 },
    { key: "gamma_1", label: "一级折扣 γ₁", defaultMin: 0.1, defaultMax: 1, defaultStep: 0.02 }
  ];

  const handleSelectParam = (option: typeof paramOptions[0]) => {
    setSelectedParam(option.key);
    setParamRange({
      min: option.defaultMin,
      max: option.defaultMax,
      step: option.defaultStep
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl">
              <TrendingUp className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">参数敏感性分析</h1>
              <p className="text-slate-500">探索不同参数对词汇规模的影响</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Settings2 size={18} />
                选择参数
              </h3>
              <div className="space-y-2">
                {paramOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSelectParam(option)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedParam === option.key
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {paramOptions.find(o => o.key === selectedParam)?.label} 的影响
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                展示该参数变化时，词汇规模各组成部分的变化趋势
              </p>
              
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysisData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="value" 
                      stroke="#64748b"
                      label={{ value: paramOptions.find(o => o.key === selectedParam)?.label, position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${(value / 10000).toFixed(2)}万`, ""]}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#1e3a8a" 
                      strokeWidth={3} 
                      name="总计" 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="synchronic" 
                      stroke="#059669" 
                      strokeWidth={2} 
                      name="共时模型" 
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="primary" 
                      stroke="#f97316" 
                      strokeWidth={2} 
                      name="一级扩展" 
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-100">
                <p className="text-sm text-blue-700 mb-1">最小值</p>
                <p className="text-2xl font-bold text-blue-900">
                  {(Math.min(...analysisData.map(d => d.total)) / 10000).toFixed(2)}万
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 border border-emerald-100">
                <p className="text-sm text-emerald-700 mb-1">最大值</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {(Math.max(...analysisData.map(d => d.total)) / 10000).toFixed(2)}万
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 border border-orange-100">
                <p className="text-sm text-orange-700 mb-1">变化幅度</p>
                <p className="text-2xl font-bold text-orange-900">
                  {((Math.max(...analysisData.map(d => d.total)) / Math.min(...analysisData.map(d => d.total)) - 1) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
