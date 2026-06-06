import React, { useState } from 'react';
import { FileText, Download, Copy, Check, TrendingUp, Clock, Sparkles, AlertCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { toast } from '../components/common/Toast';

const Report: React.FC = () => {
  const { result, params } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">暂无数据可生成报告</h2>
        <p className="text-slate-500 max-w-md mb-6">请先在参数配置页面设置模型参数，计算结果后即可在此生成报告</p>
        <Link to="/parameters" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2">
          <Settings className="w-4 h-4" />
          前往参数配置
        </Link>
      </div>
    );
  }

  const generateReport = () => {
    const date = new Date().toLocaleString('zh-CN');

    return `
# 人造语言词汇规模估算报告

## 基本信息
- **生成时间**: ${date}

## 参数配置
| 参数 | 值 |
|------|-----|
| n (原始语素) | ${params.n} |
| k (派生后缀) | ${params.k} |
| π_L (前置能产性) | ${params.pi_L} |
| π_R (后置能产性) | ${params.pi_R} |
| q_cmp2 (L=2复合融合率) | ${params.q_cmp2} |
| q_cmp3 (L=3复合融合率) | ${params.q_cmp3} |
| q_deriv1 (L=1派生融合率) | ${params.q_deriv1} |
| q_deriv2 (L=2派生融合率) | ${params.q_deriv2} |
| γ1 (一级扩展折扣) | ${params.gamma1} |
| γ2 (二级扩展折扣) | ${params.gamma2} |

## 计算结果

### 共时模型
| 长度 | 数量 |
|------|------|
| L=1 | ${Math.round(result.synchronic[1]).toLocaleString()} |
| L=2 | ${Math.round(result.synchronic[2]).toLocaleString()} |
| L=3 | ${Math.round(result.synchronic[3]).toLocaleString()} |
| L=4 | ${Math.round(result.synchronic[4]).toLocaleString()} |
| **总计** | **${Math.round(result.synchronic.total).toLocaleString()}** |

### 一级扩展
| 长度 | 数量 |
|------|------|
| L=1 | ${Math.round(result.primaryExtension[1]).toLocaleString()} |
| L=2 | ${Math.round(result.primaryExtension[2]).toLocaleString()} |
| L=3 | ${Math.round(result.primaryExtension[3]).toLocaleString()} |
| L=4 | ${Math.round(result.primaryExtension[4]).toLocaleString()} |
| **总计** | **${Math.round(result.primaryExtension.total).toLocaleString()}** |

### 二级扩展
| 长度 | 数量 |
|------|------|
| L=1 | ${Math.round(result.secondaryExtension[1]).toLocaleString()} |
| L=2 | ${Math.round(result.secondaryExtension[2]).toLocaleString()} |
| L=3 | ${Math.round(result.secondaryExtension[3]).toLocaleString()} |
| L=4 | ${Math.round(result.secondaryExtension[4]).toLocaleString()} |
| **总计** | **${Math.round(result.secondaryExtension.total).toLocaleString()}** |

## 总体统计
- **总词汇量估算**: ${Math.round(result.total).toLocaleString()}
- **新语素总量**: ${result.primaryNewMorphemes.n_total.toFixed(0)}

---
*报告由词汇规模估算系统自动生成*
`;
  };

  const copyReport = () => {
    navigator.clipboard.writeText(generateReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const content = generateReport();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabulary-estimation-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('报告已下载');
  };

  const verificationStatus = Math.abs(7372141 - Math.round(result.total)) < 100;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">报告生成</h1>
          <p className="text-slate-500">导出完整的计算报告</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyReport}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? '已复制' : '复制报告'}
          </button>
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            下载报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              报告预览
            </h3>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">总词汇量估算</span>
              </div>
              <div className="text-4xl font-bold text-blue-900">
                {Math.round(result.total).toLocaleString()}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-blue-700">
                  {verificationStatus ? '与标准模型结果一致' : '与标准模型结果有差异'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">共时模型</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {Math.round(result.synchronic.total).toLocaleString()}
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700">一级扩展</span>
                </div>
                <div className="text-2xl font-bold text-emerald-800">
                  {Math.round(result.primaryExtension.total).toLocaleString()}
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-700">二级扩展</span>
                </div>
                <div className="text-2xl font-bold text-amber-800">
                  {Math.round(result.secondaryExtension.total).toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">参数配置</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(params).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-xs text-slate-500">{key}</span>
                    <p className="text-sm font-mono text-slate-700">{typeof value === 'number' ? value.toFixed(4) : value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={
            verificationStatus
              ? 'rounded-2xl p-6 shadow-sm border bg-emerald-50 border-emerald-200'
              : 'rounded-2xl p-6 shadow-sm border bg-amber-50 border-amber-200'
          }>
            <div className="flex items-start gap-3">
              <div className={
                verificationStatus ? 'p-2 rounded-lg bg-emerald-100' : 'p-2 rounded-lg bg-amber-100'
              }>
                {verificationStatus ? (
                  <Check className="w-6 h-6 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div>
                <h4 className={
                  verificationStatus ? 'font-semibold text-emerald-800' : 'font-semibold text-amber-800'
                }>
                  {verificationStatus ? '验证通过' : '参数调整提示'}
                </h4>
                <p className={
                  verificationStatus ? 'text-sm text-emerald-600' : 'text-sm text-amber-600'
                }>
                  {verificationStatus
                    ? '当前参数配置与标准模型结果一致'
                    : '当前参数与标准配置有差异，请检查参数设置'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-4">新语素分析</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">复合来源</span>
                <span className="text-lg font-bold text-orange-600">{result.primaryNewMorphemes.n_cmp.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">派生来源</span>
                <span className="text-lg font-bold text-purple-600">{result.primaryNewMorphemes.n_deriv.toFixed(0)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">总计</span>
                  <span className="text-xl font-bold text-slate-800">{result.primaryNewMorphemes.n_total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
