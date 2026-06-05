import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { TrendingUp, Clock, BarChart3, History, Save, RefreshCw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { result, resetParams, saveToHistory } = useAppStore()

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">加载中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">概览</h1>
          <p className="text-slate-500 text-sm mt-1">词汇规模估算核心结果展示</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetParams}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={saveToHistory}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all text-sm font-medium shadow-sm hover:shadow-md"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
        </div>
      </div>

      {/* 总词汇量主卡片 */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-6">
          <div className="p-5 bg-white/20 rounded-2xl backdrop-blur-sm">
            <TrendingUp className="w-10 h-10" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium mb-2">总词汇量估算</p>
            <h2 className="text-5xl font-bold tracking-tight">
              {(result.total / 10000).toFixed(2)}
              <span className="text-2xl text-blue-200 ml-2">万</span>
            </h2>
            <p className="text-blue-200/80 text-sm mt-2">
              约 {Math.round(result.total).toLocaleString()} 个词汇类型
            </p>
          </div>
        </div>
      </div>

      {/* 三个阶段卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 共时模型 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Clock className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">共时模型</h3>
              <p className="text-xs text-slate-500">Synchronic</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-2">
            {(result.synchronic.total / 10000).toFixed(2)}万
          </div>
          <div className="text-sm text-slate-500">
            {Math.round(result.synchronic.total).toLocaleString()} 词汇
          </div>
        </div>

        {/* 一级扩展 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-100 rounded-xl">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">一级扩展</h3>
              <p className="text-xs text-slate-500">Primary Extension</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-2">
            {(result.primaryExtension.total / 10000).toFixed(2)}万
          </div>
          <div className="text-sm text-slate-500">
            {Math.round(result.primaryExtension.total).toLocaleString()} 词汇
          </div>
        </div>

        {/* 二级扩展 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-100 rounded-xl">
              <History className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">二级扩展</h3>
              <p className="text-xs text-slate-500">Secondary Extension</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-2">
            {(result.secondaryExtension.total / 10000).toFixed(2)}万
          </div>
          <div className="text-sm text-slate-500">
            {Math.round(result.secondaryExtension.total).toLocaleString()} 词汇
          </div>
        </div>
      </div>

      {/* 快速导航卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/length-analysis"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                查看长度分布
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                详细分析L1-L4词汇的构成和占比
              </p>
            </div>
            <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
        </Link>

        <Link
          to="/history"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white group-hover:scale-105 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                查看历史记录
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                管理和加载之前保存的参数配置
              </p>
            </div>
            <div className="text-slate-400 group-hover:text-emerald-500 transition-colors">
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* 新语素信息 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          一级扩展新语素
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
  )
}

// 简单的右箭头图标组件
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default Home
