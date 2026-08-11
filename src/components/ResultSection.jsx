"use client";

import React from 'react';
import ChartComponent from './ChartComponent';
import { TrendingUp, ShieldAlert, Coins } from 'lucide-react';
import { formatCurrency, formatToShortWords } from '../utils/formatters';
import { useRegion } from '../context/RegionContext';

export default function ResultSection({ results }) {
  const { locale, currencyCode, isUS } = useRegion();

  return (
    <div className="glass-panel p-4 lg:p-5 flex flex-col h-full relative overflow-hidden">
      {/* Decorative Glow */}
      


      {/* Chart Area */}
      <div className="flex-1 min-h-[180px] mb-4 relative z-10 flex flex-col">
        <ChartComponent results={results} />
      </div>

      {/* Breakdown Data - Everything in one line */}
      <div className="grid grid-cols-3 gap-2 relative z-10">
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold font-medium">
            <Coins className="w-3 h-3 mr-1" />
            Total Value
          </div>
          <div className="text-sm font-extrabold text-foreground">
            {formatCurrency(results.actualAmount, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.actualAmount, isUS)}
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mr-1.5"></div>
            Invested
          </div>
          <div className="text-sm font-extrabold text-[var(--color-accent)]">
            {formatCurrency(results.totalInvested, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.totalInvested, isUS)}
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
            <div className="w-2 h-2 rounded-full bg-[var(--color-invested)] mr-1.5"></div>
            Earned
          </div>
          <div className="text-sm font-extrabold text-[var(--color-returns)]">
            +{formatCurrency(results.wealthGained, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.wealthGained, isUS)}
          </div>
        </div>

        {/* Inflation Adjusted Block — full width yellow strip */}
        {results.inflationAdjustedAmount < results.actualAmount && (
          <div className="col-span-3 mt-1 bg-[rgba(196,153,60,0.2)] border border-[rgba(196,153,60,0.5)] rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
              <span className="text-foreground text-[10px] font-semibold tracking-wide">In Today's Value (Inflation Adjusted)</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-foreground">
                {formatCurrency(results.inflationAdjustedAmount, locale, currencyCode)}
              </div>
              <div className="text-[9px] text-foreground opacity-70 tracking-wide">
                {formatToShortWords(results.inflationAdjustedAmount, isUS)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
