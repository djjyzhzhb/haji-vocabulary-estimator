import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Clock,
  BarChart3,
  History,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store';
import { KPICard } from '../components/common/KPICard';

const Dashboard: React.FC = () => {
  const { result } = useAppStore();

  if (!result) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">概览</h1>
          <p className="text-slate-500">人造语言词汇规模估算系统</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-6">
          <div className="p-5 bg-white/20 rounded-2xl backdrop-blur-sm">
            <TrendingUp className="w-10 h-10" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium mb-2">总词汇量估算</p>
            <h2 className="text-5xl font-bold tracking-tight mb-2">
              {(result.total / 10000).toFixed(2)}
              <span className="text-2xl text-blue-200 ml-2">万</span>
            </h2>
            <p className="text-blue-200/80 text-sm">
              约 {Math.round(result.total).toLocaleString()} 个词汇类型
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="共时模型"
          value={result.synchronic.total}
          icon={Clock}
          color="blue"
          format="short"
        />
        <KPICard
          title="一级扩展"
          value={result.primaryExtension.total}
          icon={BarChart3}
          color="emerald"
          format="short"
        />
        <KPICard
          title="二级扩展"
          value={result.secondaryExtension.total}
          icon={History}
          color="amber"
          format="short"
        />
        <KPICard
          title="新语素总量"
          value={result.primaryNewMorphemes.n_total}
          icon={Sparkles}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/results"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                查看详细结果
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                长度分布、构成分析、数据表格
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </Link>

        <Link
          to="/sensitivity"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                敏感性分析
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                探索参数变化对结果的影响
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          一级扩展新语素构成
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-700">
              {result.primaryNewMorphemes.n_cmp.toFixed(0)}
            </div>
            <div className="text-xs text-orange-600 mt-1">复合来源</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-700">
              {result.primaryNewMorphemes.n_deriv.toFixed(0)}
            </div>
            <div className="text-xs text-purple-600 mt-1">派生来源</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-slate-700">
              {result.primaryNewMorphemes.n_total.toFixed(0)}
            </div>
            <div className="text-xs text-slate-600 mt-1">总计</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
