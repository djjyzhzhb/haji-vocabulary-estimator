import React from "react";
import { Settings2, Sparkles, Zap, Percent } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

interface ParamSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (val: number) => string;
}

export const ParamSlider: React.FC<ParamSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = (v) => v.toString()
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-slate-600">
          {label}
        </label>
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
      />
    </div>
  );
};

interface ParamGroupProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ParamGroup: React.FC<ParamGroupProps> = ({
  title,
  icon,
  children
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="space-y-3 pl-0.5">{children}</div>
    </div>
  );
};

export const ParamPanel: React.FC = () => {
  const { params, updateParam } = useAppStore();

  return (
    <div className="space-y-5 py-1">
      <ParamGroup title="结构参数" icon={<Settings2 size={14} />}>
        <ParamSlider
          label="原始语素数量 (n)"
          value={params.n}
          onChange={(v) => updateParam("n", v)}
          min={50}
          max={500}
          step={1}
        />
        <ParamSlider
          label="派生后缀数量 (k)"
          value={params.k}
          onChange={(v) => updateParam("k", v)}
          min={1}
          max={10}
          step={1}
        />
      </ParamGroup>

      <ParamGroup title="能产性参数" icon={<Zap size={14} />}>
        <ParamSlider
          label="前置能产性 (π_L)"
          value={params.pi_L}
          onChange={(v) => updateParam("pi_L", v)}
          min={0.01}
          max={0.2}
          step={0.005}
          format={(v) => v.toFixed(3)}
        />
        <ParamSlider
          label="后置能产性 (π_R)"
          value={params.pi_R}
          onChange={(v) => updateParam("pi_R", v)}
          min={0.05}
          max={0.8}
          step={0.01}
          format={(v) => v.toFixed(3)}
        />
      </ParamGroup>

      <ParamGroup title="融合概率" icon={<Percent size={14} />}>
        <ParamSlider
          label="复合融合 L=2 (q_cmp2)"
          value={params.q_cmp2}
          onChange={(v) => updateParam("q_cmp2", v)}
          min={0}
          max={0.1}
          step={0.001}
          format={(v) => (v * 100).toFixed(1) + "%"}
        />
        <ParamSlider
          label="复合融合 L=3 (q_cmp3)"
          value={params.q_cmp3}
          onChange={(v) => updateParam("q_cmp3", v)}
          min={0}
          max={0.001}
          step={0.00005}
          format={(v) => (v * 1000).toFixed(2) + "‰"}
        />
        <ParamSlider
          label="派生融合 L=1 (q_deriv1)"
          value={params.q_deriv1}
          onChange={(v) => updateParam("q_deriv1", v)}
          min={0}
          max={1}
          step={0.01}
          format={(v) => (v * 100).toFixed(0) + "%"}
        />
        <ParamSlider
          label="派生融合 L=2 (q_deriv2)"
          value={params.q_deriv2}
          onChange={(v) => updateParam("q_deriv2", v)}
          min={0}
          max={0.1}
          step={0.001}
          format={(v) => (v * 100).toFixed(1) + "%"}
        />
      </ParamGroup>

      <ParamGroup title="折扣系数" icon={<Sparkles size={14} />}>
        <ParamSlider
          label="一级新语素折扣 (γ₁)"
          value={params.gamma_1}
          onChange={(v) => updateParam("gamma_1", v)}
          min={0.1}
          max={1}
          step={0.01}
          format={(v) => v.toFixed(2)}
        />
        <ParamSlider
          label="二级新语素折扣 (γ₂)"
          value={params.gamma_2}
          onChange={(v) => updateParam("gamma_2", v)}
          min={0.05}
          max={1}
          step={0.01}
          format={(v) => v.toFixed(2)}
        />
      </ParamGroup>
    </div>
  );
};
