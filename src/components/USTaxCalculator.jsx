"use client";

import React, { useState, useMemo } from 'react';
import InputSlider from './InputSlider';
import { AlertCircle, FileText, Landmark } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const BRACKETS_2024 = [
  { max: 11600, rate: 0.10 },
  { max: 47150, rate: 0.12 },
  { max: 100525, rate: 0.22 },
  { max: 191950, rate: 0.24 },
  { max: 243725, rate: 0.32 },
  { max: 609350, rate: 0.35 },
  { max: Infinity, rate: 0.37 },
];

export default function USTaxCalculator() {
  const [income, setIncome] = useState(85000);
  const [deductionType, setDeductionType] = useState('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState(15000);

  const results = useMemo(() => {
    const deductions = deductionType === 'standard' ? 14600 : itemizedDeductions;
    const taxable = Math.max(0, income - deductions);
    let remaining = taxable;
    let totalTax = 0;
    let previousMax = 0;
    let breakdown = [];
    let marginalRate = 0;

    for (let i = 0; i < BRACKETS_2024.length; i++) {
      const bracket = BRACKETS_2024[i];
      const bracketSize = bracket.max - previousMax;
      
      if (remaining > 0) {
        const amountInBracket = Math.min(remaining, bracketSize);
        const taxInBracket = amountInBracket * bracket.rate;
        totalTax += taxInBracket;
        remaining -= amountInBracket;
        marginalRate = bracket.rate * 100;
        
        breakdown.push({
            rate: bracket.rate * 100,
            amount: amountInBracket,
            tax: taxInBracket
        });
      }
      
      previousMax = bracket.max;
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return {
      taxable,
      totalTax,
      effectiveRate,
      marginalRate,
      breakdown,
      takeHome: income - totalTax
    };
  }, [income, deductionType, itemizedDeductions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start w-full">
      
      {/* Input Section */}
      <div className="lg:col-span-5 glass-panel p-4 lg:p-5 relative flex flex-col gap-2">
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-1">2024 Federal Tax (Single Filer)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Calculate your estimated US federal income tax based on 2024 IRS brackets.</p>
        </div>
        
        <InputSlider label="Gross Annual Income" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} prefix="$" />
        
        <div className="flex flex-col gap-1.5 mt-2 mb-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Deduction Type</label>
            <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg">
                <button 
                    className={`flex-1 text-xs font-semibold py-2 rounded-md transition-colors ${deductionType === 'standard' ? 'bg-white dark:bg-[#1f2937] text-foreground shadow-sm' : 'text-gray-500'}`}
                    onClick={() => setDeductionType('standard')}
                >
                    Standard ($14,600)
                </button>
                <button 
                    className={`flex-1 text-xs font-semibold py-2 rounded-md transition-colors ${deductionType === 'itemized' ? 'bg-white dark:bg-[#1f2937] text-foreground shadow-sm' : 'text-gray-500'}`}
                    onClick={() => setDeductionType('itemized')}
                >
                    Itemized
                </button>
            </div>
        </div>

        {deductionType === 'itemized' && (
            <InputSlider label="Itemized Deductions" value={itemizedDeductions} onChange={setItemizedDeductions} min={0} max={100000} step={1000} prefix="$" />
        )}
        
        <div className="mt-4 p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
                The standard deduction for Single Filers in 2024 is <strong>$14,600</strong>. This calculator estimates Federal Income Tax only. It does not include State Taxes, FICA (Social Security & Medicare), or local taxes.
            </p>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-7 h-full flex flex-col gap-4">
        
        {/* Banner */}
        <div className="glass-panel p-5 bg-[var(--color-accent)] text-white border-0 shadow-lg relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Landmark className="w-24 h-24" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <span className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1 block">Total Federal Tax</span>
                    <div className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                        {formatCurrency(results.totalTax, 'en-US', 'USD')}
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1 block">Effective Rate</span>
                    <div className="text-2xl font-bold text-[#C4993C]">
                        {results.effectiveRate.toFixed(1)}%
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">After Federal Income Tax:</span>
                    <span className="font-bold">{formatCurrency(results.takeHome, 'en-US', 'USD')}</span>
                </div>
                <p className="text-white/60 text-[10px] mt-2 leading-relaxed">
                    Excludes Social Security, Medicare (FICA), state/local taxes, credits, and other deductions.
                </p>
            </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass-panel p-5 flex flex-col flex-1">
            <h3 className="font-bold text-foreground mb-4 border-b border-black/5 dark:border-white/10 pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--color-accent)]" />
                Tax Bracket Breakdown
            </h3>
            
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead>
                        <tr className="text-gray-500 dark:text-gray-400 border-b border-black/5 dark:border-white/10">
                            <th className="pb-2 font-semibold">Tax Rate</th>
                            <th className="pb-2 font-semibold text-right">Taxable Amount</th>
                            <th className="pb-2 font-semibold text-right">Tax Owed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {results.breakdown.map((b, i) => (
                            <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="py-2.5">
                                    <span className="font-medium px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground">
                                        {b.rate}%
                                    </span>
                                </td>
                                <td className="py-2.5 text-right font-medium text-gray-700 dark:text-gray-300">
                                    {formatCurrency(b.amount, 'en-US', 'USD')}
                                </td>
                                <td className="py-2.5 text-right font-bold text-[#991B1B]">
                                    {formatCurrency(b.tax, 'en-US', 'USD')}
                                </td>
                            </tr>
                        ))}
                        {results.breakdown.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-500 font-medium">
                                    No tax owed. Income is below standard deduction.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {results.breakdown.length > 0 && (
                        <tfoot>
                            <tr className="border-t-2 border-black/10 dark:border-white/10">
                                <td className="pt-3 font-semibold text-foreground">Total</td>
                                <td className="pt-3 text-right font-semibold text-foreground">{formatCurrency(results.taxable, 'en-US', 'USD')}</td>
                                <td className="pt-3 text-right font-bold text-foreground">{formatCurrency(results.totalTax, 'en-US', 'USD')}</td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-[rgba(27,58,92,0.05)] dark:bg-white/5 p-3 rounded-lg border border-black/5 dark:border-white/5">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Your Top Marginal Tax Rate</span>
                <span className="text-sm font-bold text-foreground">{results.marginalRate}%</span>
            </div>
        </div>

      </div>
    </div>
  );
}
