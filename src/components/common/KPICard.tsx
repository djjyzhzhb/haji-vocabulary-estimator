import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  subtitle?: string;
  value: number;
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'amber' | 'purple';
  format?: 'number' | 'percent' | 'short';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  purple: 'bg-purple-50 text-purple-700',
};

const iconBgClasses = {
  blue: 'bg-blue-100',
  emerald: 'bg-emerald-100',
  amber: 'bg-amber-100',
  purple: 'bg-purple-100',
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  subtitle,
  value,
  icon: Icon,
  color = 'blue',
  format = 'number',
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'short':
        if (val >= 10000) return (val / 10000).toFixed(2) + '万';
        return val.toLocaleString();
      case 'percent':
        return (val * 100).toFixed(1) + '%';
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
        </div>
      </div>
      <h3 className="text-xs font-medium text-slate-500 mb-1">{title}</h3>
      <div className="text-xl font-bold text-slate-800 mb-0.5 truncate tabular-nums">
        {formatValue(value)}
      </div>
      {subtitle && <p className="text-xs text-slate-400 truncate">{subtitle}</p>}
    </div>
  );
};
