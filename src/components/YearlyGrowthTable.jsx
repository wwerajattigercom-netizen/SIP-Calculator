"use client";

import React from 'react';
import { formatToShortWords } from '../utils/formatters';

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

/**
 * YearlyGrowthTable
 * Shows a year-by-year breakdown of how the corpus grows toward the goal.
 * Highlights the year the goal is reached.
 */
export default function YearlyGrowthTable({ yearlyData, targetAmount, goalTotalMonths }) {
  if (!yearlyData || yearlyData.length === 0) return null;

  const goalYear = goalTotalMonths ? Math.ceil(goalTotalMonths / 12) : null;

  return (
    <div className="glass-panel overflow-hidden">
      <div className="px-5 py-4 border-b border-white border-opacity-10">
        <h2 className="text-white font-bold text-base">Year-by-Year Wealth Growth</h2>
        <p className="text-gray-500 text-xs mt-0.5">How your portfolio compounds toward ₹{formatToShortWords(targetAmount)}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[480px]">
          <thead>
            <tr className="bg-[rgba(139,92,246,0.12)] border-b border-white border-opacity-10">
              <th className="text-left text-[#c4b5fd] font-semibold py-3 px-4">Year</th>
              <th className="text-right text-gray-400 font-semibold py-3 px-3">Total Invested</th>
              <th className="text-right text-green-400 font-semibold py-3 px-3">Gains Earned</th>
              <th className="text-right text-[#c4b5fd] font-semibold py-3 px-4">Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            {yearlyData.map(({ year, balance, invested, gains }, i) => {
              const isGoalYear = goalYear !== null && year === goalYear;
              const isGoalCrossed = goalYear !== null && year > goalYear;
              const progress = Math.min(100, (balance / targetAmount) * 100);

              return (
                <tr
                  key={year}
                  className={`border-b border-white border-opacity-5 transition-colors ${
                    isGoalYear
                      ? 'bg-[rgba(139,92,246,0.2)] border-[rgba(139,92,246,0.4)]'
                      : i % 2 === 0
                      ? 'bg-[rgba(255,255,255,0.015)]'
                      : ''
                  }`}
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isGoalYear ? 'text-[#a78bfa]' : 'text-gray-300'}`}>
                        Year {year}
                      </span>
                      {isGoalYear && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8b5cf6] text-white">
                          🎯 GOAL REACHED
                        </span>
                      )}
                    </div>
                    {/* Progress bar toward goal */}
                    <div className="mt-1 w-full h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          background: isGoalYear
                            ? '#8b5cf6'
                            : isGoalCrossed
                            ? '#22C55E'
                            : `linear-gradient(90deg, #3B82F6, #8b5cf6)`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-400">
                    <div>{formatCurrency(invested)}</div>
                    <div className="text-[9px] text-gray-600 mt-0.5">{formatToShortWords(invested)}</div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-green-400">
                    <div>+{formatCurrency(gains)}</div>
                    <div className="text-[9px] text-green-800 mt-0.5">{formatToShortWords(gains)}</div>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <div className={`font-bold ${isGoalYear ? 'text-[#a78bfa]' : 'text-white'}`}>
                      {formatCurrency(balance)}
                    </div>
                    <div className={`text-[9px] mt-0.5 ${isGoalYear ? 'text-[#c4b5fd]' : 'text-gray-500'}`}>
                      {formatToShortWords(balance)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-gray-600 text-[10px] border-t border-white border-opacity-5">
        ⚠️ Projections are illustrative only. Actual returns vary with market conditions.
      </div>
    </div>
  );
}
