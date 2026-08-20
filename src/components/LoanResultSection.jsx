"use client";

import React from 'react';
import dynamic from 'next/dynamic';
const LoanChartComponent = dynamic(() => import('./LoanChartComponent'), { ssr: false });
import { CalendarDays, AlertCircle, Coins, ArrowRightLeft } from 'lucide-react';
import { formatCurrency, formatToShortWords } from '../utils/formatters';
import { useRegion } from '../context/RegionContext';

export default function LoanResultSection({ results }) {
  const { locale, currencyCode, isUS } = useRegion();

  if (!results) return null;

  return (
    <div className="glass-panel p-4 lg:p-5 flex flex-col h-full relative overflow-hidden">
      {/* EMI Banner */}
      <div className="bg-[#1B3A5C] dark:bg-[#1A73E8] text-white rounded-xl p-4 mb-4 flex items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-white/80 text-xs font-medium flex items-center gap-1.5 mb-1">
            <CalendarDays className="w-4 h-4" />
            Monthly EMI
          </span>
          <span className="text-2xl font-bold tracking-tight">
            {formatCurrency(results.emi, locale, currencyCode)}
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[220px] mb-4 relative z-10 flex flex-col">
        <LoanChartComponent results={results} />
      </div>

      {/* Breakdown Data - Everything in one line */}
      <div className="grid grid-cols-3 gap-2 relative z-10">
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
            <div className="w-2 h-2 rounded-full bg-[#1B3A5C] dark:bg-[#1A73E8] mr-1.5"></div>
            Principal
          </div>
          <div className="text-sm font-extrabold text-[#1B3A5C] dark:text-[#1A73E8]">
            {formatCurrency(results.loanAmount, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.loanAmount, isUS)}
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
            <div className="w-2 h-2 rounded-full bg-[#991B1B] mr-1.5"></div>
            Total Interest
          </div>
          <div className="text-sm font-extrabold text-[#991B1B]">
            {formatCurrency(results.totalInterest, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.totalInterest, isUS)}
          </div>
        </div>
        
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
            <Coins className="w-3 h-3 mr-1" />
            Total Payable
          </div>
          <div className="text-sm font-extrabold text-foreground">
            {formatCurrency(results.totalPayable, locale, currencyCode)}
          </div>
          <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.totalPayable, isUS)}
          </div>
        </div>
      </div>
    </div>
  );
}
