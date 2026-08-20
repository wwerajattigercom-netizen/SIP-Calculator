"use client";

import React from 'react';
import { formatCurrency, formatToShortWords } from '../utils/formatters';
import { useRegion } from '../context/RegionContext';

/**
 * YearlyGrowthTable
 * Shows a year-by-year breakdown of how the corpus grows toward the goal.
 * Highlights the year the goal is reached.
 */
export default function YearlyGrowthTable({ yearlyData, targetAmount, goalTotalMonths }) {
  const { locale, currencyCode, isUS, currencySymbol } = useRegion();
  if (!yearlyData || yearlyData.length === 0) return null;

  const goalYear = goalTotalMonths ? Math.ceil(goalTotalMonths / 12) : null;

  return (
    <div className="glass-panel overflow-hidden">
      <div className="px-5 py-4 border-b border-black/5 dark:border-white/10">
        <h2 className="text-foreground font-bold text-base">Year-by-Year Wealth Growth</h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">How your portfolio compounds toward {formatToShortWords(targetAmount, isUS)}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[480px]">
          <thead>
            <tr className="bg-[rgba(27,58,92,0.12)] border-b border-black/5 dark:border-white/10">
              <th className="text-left text-[#6B7280] dark:text-[#8B95A5] font-semibold py-3 px-4">Year</th>
              <th className="text-right text-gray-500 dark:text-gray-400 font-semibold py-3 px-3">Total Invested</th>
              <th className="text-right text-[#0D9488] font-semibold py-3 px-3">Gains Earned</th>
              <th className="text-right text-[#6B7280] dark:text-[#8B95A5] font-semibold py-3 px-4">Portfolio Value</th>
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
                  className={`border-b border-black/5 dark:border-white/10 transition-colors ${
                    isGoalYear
                      ? 'bg-[rgba(27,58,92,0.2)] border-[rgba(27,58,92,0.4)]'
                      : i % 2 === 0
                      ? 'bg-[rgba(0,0,0,0.03)]'
                      : ''
                  }`}
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isGoalYear ? 'text-[var(--color-accent)]' : 'text-gray-600 dark:text-gray-400'}`}>
                        Year {year}
                      </span>
                      {isGoalYear && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-white">
                          🎯 GOAL REACHED
                        </span>
                      )}
                    </div>
                    {/* Progress bar toward goal */}
                    <div className="mt-1 w-full h-1 bg-[var(--panel-bg)] bg-opacity-10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          background: isGoalYear
                            ? 'var(--color-accent)'
                            : isGoalCrossed
                            ? '#0D9488'
                            : `linear-gradient(90deg, var(--color-accent), var(--color-accent))`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-500 dark:text-gray-400">
                    <div>{formatCurrency(invested, locale, currencyCode)}</div>
                    <div className="text-[9px] text-gray-600 dark:text-gray-400 mt-0.5">{formatToShortWords(invested, isUS)}</div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#0D9488]">
                    <div>+{formatCurrency(gains, locale, currencyCode)}</div>
                    <div className="text-[9px] text-green-800 mt-0.5">{formatToShortWords(gains, isUS)}</div>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <div className={`font-bold ${isGoalYear ? 'text-[var(--color-accent)]' : 'text-white'}`}>
                      {formatCurrency(balance, locale, currencyCode)}
                    </div>
                    <div className={`text-[9px] mt-0.5 ${isGoalYear ? 'text-[#6B7280] dark:text-[#8B95A5]' : 'text-gray-500 dark:text-gray-400'}`}>
                      {formatToShortWords(balance, isUS)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-gray-600 dark:text-gray-400 text-[10px] border-t border-black/5 dark:border-white/10">
        ⚠️ Projections are illustrative only. Actual returns vary with market conditions.
      </div>
    </div>
  );
}
