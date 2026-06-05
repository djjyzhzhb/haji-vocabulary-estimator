import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Settings,
  BarChart3,
  TrendingUp,
  History,
  FileText,
} from 'lucide-react';
import { useAppStore } from '../../store';

const navItems = [
  { path: '/', label: '概览', icon: Home },
  { path: '/parameters', label: '参数配置', icon: Settings },
  { path: '/results', label: '结果展示', icon: BarChart3 },
  { path: '/sensitivity', label: '敏感性分析', icon: TrendingUp },
  { path: '/history', label: '历史记录', icon: History },
  { path: '/report', label: '报告生成', icon: FileText },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { result } = useAppStore();

  const verificationStatus = result
    ? Math.abs(7372141 - Math.round(result.total)) < 100
    : false;

  return (
    <div className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">词汇估算系统</h1>
            <p className="text-xs text-slate-500">Vocabulary Estimator</p>
          </div>
        </div>

        {result && (
          <div className={`mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
            verificationStatus ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {verificationStatus ? '验证通过' : '参数偏离标准值'}
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="text-xs text-slate-400 text-center">
          v1.0.0 • Advanced Architecture
        </div>
      </div>
    </div>
  );
};
