import React from 'react';
import { ModelParams } from '../../types';
import { PARAM_INFO } from '../../config/params';

interface ParamSliderProps {
  paramKey: keyof ModelParams;
  value: number;
  onChange: (value: number) => void;
}

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
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) onChange(Math.min(Math.max(val, info.min), info.max));
          }}
          className="w-28 px-3 py-2 text-right bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
