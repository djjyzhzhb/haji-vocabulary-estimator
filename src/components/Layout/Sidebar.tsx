import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Settings,
  BarChart3,
  TrendingUp,
  History,
  FileText,
  ChevronLeft,
  X,
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

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onNavigate }) => {
  const location = useLocation();
  const { result } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);

  const verificationStatus = result
    ? Math.abs(7372141 - Math.round(result.total)) < 100
    : false;

  const widthClass = collapsed ? 'w-20' : 'w-72';

  return (
    <div
      className={`${widthClass} ${mobile ? 'fixed inset-y-0 left-0 z-50' : 'sticky top-0 self-start'} bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm transition-[width] duration-300 ease-in-out overflow-hidden`}
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-white flex-shrink-0" />
          </div>
          <div className="min-w-0 overflow-hidden whitespace-nowrap flex-1">
            <h1 className="text-lg font-semibold text-slate-800 truncate">词汇估算系统</h1>
            <p className="text-xs text-slate-500 truncate">Vocabulary Estimator</p>
          </div>
          {mobile && (
            <button
              onClick={onNavigate}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="关闭菜单"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {result && (
          <div className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out"
            style={{
              maxHeight: collapsed ? '0px' : '40px',
              opacity: collapsed ? 0 : 1,
              marginTop: collapsed ? '0px' : '16px',
            }}
          >
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
              verificationStatus ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse flex-shrink-0" />
              {verificationStatus ? '验证通过' : '参数偏离标准值'}
            </div>
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
              onClick={onNavigate}
              className={`flex items-center h-12 px-4 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3 overflow-hidden whitespace-nowrap transition-[width,opacity] duration-300 ease-in-out"
                style={{
                  width: collapsed ? '0px' : undefined,
                  opacity: collapsed ? 0 : 1,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 flex-shrink-0">
        <div className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out"
          style={{
            maxHeight: collapsed ? '0px' : '24px',
            opacity: collapsed ? 0 : 1,
            marginBottom: collapsed ? '0px' : '12px',
          }}
        >
          <div className="text-xs text-slate-400 text-center whitespace-nowrap">
            v1.0.0 • Advanced Architecture
          </div>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center h-9 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          <span className="ml-2 overflow-hidden whitespace-nowrap transition-[width,opacity] duration-300 ease-in-out"
            style={{
              width: collapsed ? '0px' : undefined,
              opacity: collapsed ? 0 : 1,
            }}
          >
            收起
          </span>
        </button>
      </div>
    </div>
  );
};
