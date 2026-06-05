import React, { useState } from 'react';
import { History as HistoryIcon, Clock, Trash2, RotateCcw, Download } from 'lucide-react';
import { useAppStore } from '../store';

const History: React.FC = () => {
  const { history, loadFromHistory, deleteFromHistory, clearHistory } = useAppStore();
  const [confirmClear, setConfirmClear] = useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
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
        <div className="grid gap-4">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.name || `计算结果 #${history.length - index}`}
                      </h3>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-slate-500">总词汇量</span>
                        <p className="text-xl font-bold text-slate-800">
                          {Math.round(item.total).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">共时模型</span>
                        <p className="text-lg font-semibold text-blue-600">
                          {Math.round(item.synchronic.total).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">一级扩展</span>
                        <p className="text-lg font-semibold text-emerald-600">
                          {Math.round(item.primaryExtension.total).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">二级扩展</span>
                        <p className="text-lg font-semibold text-amber-600">
                          {Math.round(item.secondaryExtension.total).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(item.params).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono"
                        >
                          {key}: {typeof value === 'number' ? value.toFixed(4) : value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => loadFromHistory(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    载入
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
