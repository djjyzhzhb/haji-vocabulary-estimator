import React from "react";
import { NumberCounter } from "./NumberCounter";

interface ResultCardProps {
  title: string;
  subtitle?: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  subtitle,
  value,
  icon,
  color = "text-blue-900",
  bgColor = "from-blue-50 to-cyan-100",
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 shadow-lg border border-white/50 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-white/80 rounded-xl shadow-sm">
          <div className={color}>{icon}</div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
            <NumberCounter value={value} />
          </p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export const ResultCharts: React.FC = () => null;
