import React, { useEffect } from 'react';
import { Settings, RotateCcw, Save } from 'lucide-react';
import { useAppStore } from '../store';
import { PARAM_CONFIGS } from '../config/params';
import { ParamSlider } from '../components/params/ParamSlider';
import { toast } from '../components/common/Toast';

const Parameters: React.FC = () => {
  const { params, updateParam, resetParams, calculate, saveToHistory } = useAppStore();

  useEffect(() => {
    calculate();
  }, [params, calculate]);

  const handleReset = () => {
    resetParams();
    toast.info('参数已恢复默认值');
  };

  const handleSave = () => {
    saveToHistory();
    toast.success('计算结果已保存到历史记录');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">参数配置</h1>
          <p className="text-slate-500">调整模型参数，实时计算结果</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
        </div>
      </div>

      {Object.entries(PARAM_CONFIGS).map(([category, config]) => (
        <div key={category} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Settings className="w-4 h-4 text-slate-600" />
            </div>
            {config.label}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {config.params.map((paramKey) => (
              <ParamSlider
                key={paramKey}
                paramKey={paramKey}
                value={params[paramKey]}
                onChange={(val) => updateParam(paramKey, val)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parameters;
