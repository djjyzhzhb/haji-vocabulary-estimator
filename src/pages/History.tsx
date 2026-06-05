import React, { useState } from 'react';
import { History as HistoryIcon, Clock, Trash2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../store';
import { PARAM_CONFIGS } from '../config/params';
import { ModelParams } from '../types';

const DEFAULT_PARAMS: ModelParams = {
  n: 192,
  k: 4,
  pi_L: 1 / 12,
  pi_R: 1 / 3,
  q_cmp2: 0.02,
  q_cmp3: 0.0002,
  q_deriv1: 0.5,
  q_deriv2: 0.02,
  gamma1: 2 / 3,
  gamma2: 0.5,
};

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

const formatParamVal = (key: string, val: number): string => {
  if (key === 'n' || key === 'k') return Math.round(val).toString();
  if (key === 'q_cmp3') return val.toFixed(4);
  return val.toFixed(3);
};

const paramGroups = Object.values(PARAM_CONFIGS);

const History: React.FC = () => {
  const { history, loadFromHistory, deleteFromHistory, clearHistory } = useAppStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const hasDiff = (params: ModelParams) => {
    return Object.keys(DEFAULT_PARAMS).some(
      (k) => params[k as keyof ModelParams] !== DEFAULT_PARAMS[k as keyof ModelParams]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">历史记录</h1>
          <p className="text-slate-500">保存和管理您的计算结果</p>
        </div>
        {history.length > 0 && (
          <div className="flex gap-2">
            {confirmClear ? (
              <>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    clearHistory();
                    setConfirmClear(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  确认清空
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                清空记录
              </button>
            )}
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HistoryIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">暂无历史记录</h3>
          <p className="text-slate-500">在参数配置页面保存您的计算结果后，它们将显示在这里</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {history.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const changed = hasDiff(item.params);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm border transition-shadow ${
                  isExpanded ? 'border-blue-200 shadow-md' : 'border-slate-100 hover:shadow-md'
                }`}
              >
                <div className="px-6 py-4 flex items-center gap-4">
                  <div className="p-2.5 bg-blue-50 rounded-xl flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-700">
                        {item.name || `结果 #${history.length - index}`}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(item.timestamp)}</span>
                      {changed && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                          已修改参数
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right flex-shrink-0">
                    <div className="hidden sm:block">
                      <span className="text-xs text-slate-400">总计</span>
                      <p className="text-lg font-bold text-slate-800">
                        {Math.round(item.total).toLocaleString()}
                      </p>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-slate-200" />
                    <div className="hidden md:block">
                      <span className="text-xs text-slate-400">共时</span>
                      <p className="text-sm font-semibold text-blue-600">
                        {Math.round(item.synchronic.total).toLocaleString()}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-xs text-slate-400">一级</span>
                      <p className="text-sm font-semibold text-emerald-600">
                        {Math.round(item.primaryExtension.total).toLocaleString()}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-xs text-slate-400">二级</span>
                      <p className="text-sm font-semibold text-amber-600">
                        {Math.round(item.secondaryExtension.total).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                      title={isExpanded ? '收起参数' : '展开参数'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteFromHistory(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => loadFromHistory(item)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      载入
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-6 py-4 bg-slate-50 rounded-b-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {paramGroups.map((group) => (
                        <div key={group.label}>
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                            {group.label}
                          </h4>
                          <div className="space-y-1.5">
                            {group.params.map((paramKey) => {
                              const val = item.params[paramKey as keyof ModelParams];
                              const defaultVal = DEFAULT_PARAMS[paramKey as keyof ModelParams];
                              const isDiff = val !== defaultVal;
                              return (
                                <div
                                  key={paramKey}
                                  className={`flex items-center justify-between text-xs py-1 px-2 rounded-md ${
                                    isDiff ? 'bg-amber-50' : ''
                                  }`}
                                >
                                  <span className="text-slate-500">{paramKey}</span>
                                  <span
                                    className={`font-mono font-medium ${
                                      isDiff ? 'text-amber-700' : 'text-slate-700'
                                    }`}
                                  >
                                    {formatParamVal(paramKey, val)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
