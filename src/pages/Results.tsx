import React, { useMemo, useState } from 'react';
import { BarChart3, PieChart, Table, TrendingUp, Layers, Type, Box, Ruler, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { UnifiedLengthChart } from '../components/charts/UnifiedLengthChart';
import { LayerDistributionChart } from '../components/charts/LayerDistributionChart';
import { WordTypeChart } from '../components/charts/WordTypeChart';
import { ExtensionBreakdownChart } from '../components/charts/ExtensionBreakdownChart';
import { KPICard } from '../components/common/KPICard';
import { ResultsTable } from '../components/tables/ResultsTable';

type ViewMode = 'charts' | 'table';

const Results: React.FC = () => {
  const { result } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('charts');

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <BarChart3 className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">暂无计算结果</h2>
        <p className="text-slate-500 max-w-md mb-6">请先在参数配置页面设置模型参数，系统会自动计算结果</p>
        <Link to="/parameters" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2">
          <Settings className="w-4 h-4" />
          前往参数配置
        </Link>
      </div>
    );
  }

  const layerData = useMemo(() => {
    return {
      synchronic: result.synchronic.total,
      primary: result.primaryExtension.total,
      secondary: result.secondaryExtension.total,
    };
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">结果展示</h1>
          <p className="text-slate-500">以词长度(L)为核心的多维度可视化分析</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setViewMode('charts')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'charts'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              图表
            </div>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4" />
              表格
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="共时模型"
          value={result.synchronic.total}
          icon={Layers}
          color="blue"
          format="short"
        />
        <KPICard
          title="一级扩展"
          value={result.primaryExtension.total}
          icon={TrendingUp}
          color="emerald"
          format="short"
        />
        <KPICard
          title="二级扩展"
          value={result.secondaryExtension.total}
          icon={TrendingUp}
          color="amber"
          format="short"
        />
        <KPICard
          title="总计"
          value={result.total}
          icon={BarChart3}
          color="purple"
          format="short"
        />
      </div>

      {viewMode === 'charts' ? (
        <div className="space-y-6">
          {/* 第一行：统一的综合图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-500" />
                词汇长度分布综合分析
              </h3>
              <UnifiedLengthChart result={result} />
            </div>
          </div>

          {/* 第二行：其他图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" />
                总体层级分布
              </h3>
              <LayerDistributionChart data={layerData} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Type className="w-5 h-5 text-purple-500" />
                各层级词类型分布 (比例)
              </h3>
              <WordTypeChart result={result} />
            </div>
          </div>

          {/* 第三行：扩展构成 */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Box className="w-5 h-5 text-pink-500" />
                一级扩展内部构成
              </h3>
              <ExtensionBreakdownChart result={result} />
            </div>
          </div>
        </div>
      ) : (
        <ResultsTable result={result} />
      )}
    </div>
  );
};

export default Results;
