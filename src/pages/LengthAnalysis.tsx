import React, { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { BarChart3, PieChart, Table, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts'

const LengthAnalysis: React.FC = () => {
  const { result } = useAppStore()

  const lenDistData = useMemo(() => {
    if (!result) return []
    return Object.entries(result.synchronic.len_dist).map(([key, value]) => ({
      name: `L${key}`,
      count: Math.round(value),
      percent: (value / result.synchronic.total) * 100
    }))
  }, [result])

  const COLORS = ['#1e3a8a', '#0ea5e9', '#06b6d4', '#22d3ee']

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">加载中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <BarChart3 className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">词汇长度分布分析</h1>
          <p className="text-slate-500 text-sm mt-1">详细分析共时模型中各长度词汇的构成</p>
        </div>
      </div>

      {/* 核心统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {lenDistData.map((item, idx) => (
          <div key={item.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 text-sm font-medium">{item.name} 词汇</span>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[idx] }}
              />
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {item.count.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {item.percent.toFixed(2)}% 占比
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 柱状图 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">长度分布柱状图</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lenDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => (val / 10000).toFixed(0) + '万'}
                />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => [
                    `${value.toLocaleString()} (${props.payload.percent.toFixed(2)}%)`,
                    '词汇数量'
                  ]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                >
                  {lenDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 饼图 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-slate-800">占比饼图</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={lenDistData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={90}
                  dataKey="count"
                >
                  {lenDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), '词汇数量']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 详细数据表 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Table className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-800">详细数据</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">长度</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">数量</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">占比</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">E_cmp</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">D_fused</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lenDistData.map((item, idx) => (
                <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: COLORS[idx] }}
                      />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-800">
                    {item.count.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600">
                    {item.percent.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500">
                    {Math.round(result.synchronic.E_cmp[idx + 1] || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500">
                    {Math.round(result.synchronic.details.D_fused[idx + 1] || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold">
                <td className="py-3 px-4 text-slate-700">总计</td>
                <td className="py-3 px-4 text-right text-slate-800">
                  {Math.round(result.synchronic.total).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-slate-600">100%</td>
                <td className="py-3 px-4 text-right"></td>
                <td className="py-3 px-4 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 说明卡片 */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">分析说明</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              词汇长度分布展示了共时模型中L1至L4词汇的构成情况。
              L1主要由基础词素和融合派生构成，L2-L4主要由复合词构成。
              通过调整参数可以观察不同融合概率对长度分布的影响。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LengthAnalysis
