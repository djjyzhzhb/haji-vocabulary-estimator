import React from 'react';
import { ModelParams } from '../../types';
import { PARAM_INFO } from '../../config/params';

interface ParamSliderProps {
  paramKey: keyof ModelParams;
  value: number;
  onChange: (value: number) => void;
}

// 格式化数字，避免过长的小数显示
const formatNumber = (num: number, step: number): string => {
  // 计算step的小数位数
  const stepStr = step.toString();
  const decimalIndex = stepStr.indexOf('.');
  const decimalPlaces = decimalIndex === -1 ? 0 : stepStr.length - decimalIndex - 1;
  
  // 使用合适的精度格式化数字，然后去除末尾多余的0
  const formatted = num.toFixed(Math.min(decimalPlaces + 2, 10));
  
  // 去除末尾的0，如果小数点后面都是0则去除小数点
  if (formatted.includes('.')) {
    return formatted.replace(/0+$/, '').replace(/\.$/, '');
  }
  return formatted;
};

export const ParamSlider: React.FC<ParamSliderProps> = ({ paramKey, value, onChange }) => {
  const info = PARAM_INFO[paramKey];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            {info.label}
          </label>
          <p className="text-xs text-slate-400">{info.desc}</p>
        </div>
        <input
          type="number"
          value={formatNumber(value, info.step)}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) onChange(Math.min(Math.max(val, info.min), info.max));
          }}
          className="w-32 px-3 py-2 text-right bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          step={info.step}
          min={info.min}
          max={info.max}
        />
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={info.min}
        max={info.max}
        step={info.step}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
};
