import React from 'react';
import { CalculationResult } from '../../types';

interface ResultsTableProps {
  result: CalculationResult;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                统计项
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                L=1
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                L=2
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                L=3
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                L=4
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                总计
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-blue-50/50">
              <td className="px-6 py-4 text-sm font-medium text-slate-700">共时模型</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.synchronic[1]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.synchronic[2]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.synchronic[3]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.synchronic[4]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-blue-700 text-right font-mono">
                {Math.round(result.synchronic.total).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-slate-700">一级扩展</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.primaryExtension[1]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.primaryExtension[2]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.primaryExtension[3]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.primaryExtension[4]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-emerald-700 text-right font-mono">
                {Math.round(result.primaryExtension.total).toLocaleString()}
              </td>
            </tr>
            <tr className="bg-amber-50/50">
              <td className="px-6 py-4 text-sm font-medium text-slate-700">二级扩展</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.secondaryExtension[1]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.secondaryExtension[2]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.secondaryExtension[3]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right font-mono">
                {Math.round(result.secondaryExtension[4]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-amber-700 text-right font-mono">
                {Math.round(result.secondaryExtension.total).toLocaleString()}
              </td>
            </tr>
            <tr className="bg-slate-100 font-semibold">
              <td className="px-6 py-4 text-sm text-slate-800">总计</td>
              <td className="px-6 py-4 text-sm text-slate-700 text-right font-mono">
                {Math.round(result.synchronic[1] + result.primaryExtension[1] + result.secondaryExtension[1]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 text-right font-mono">
                {Math.round(result.synchronic[2] + result.primaryExtension[2] + result.secondaryExtension[2]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 text-right font-mono">
                {Math.round(result.synchronic[3] + result.primaryExtension[3] + result.secondaryExtension[3]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 text-right font-mono">
                {Math.round(result.synchronic[4] + result.primaryExtension[4] + result.secondaryExtension[4]).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-purple-700 text-right font-mono text-lg">
                {Math.round(result.total).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
