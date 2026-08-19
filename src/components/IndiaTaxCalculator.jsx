"use client";

import React, { useState, useMemo } from 'react';
import InputSlider from './InputSlider';
import { TrendingUp, AlertCircle, Coins, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function IndiaTaxCalculator() {
  const [salary, setSalary] = useState(1200000);
  const [exemptions, setExemptions] = useState(0); // HRA, LTA
  const [deductions, setDeductions] = useState(150000); // 80C, 80D

  const results = useMemo(() => {
    const stdDeduction = 50000;
    
    // Old Regime
    const taxableOld = Math.max(0, salary - exemptions - stdDeduction - deductions);
    let taxOld = 0;
    if (taxableOld > 250000) {
      if (taxableOld <= 500000) {
        taxOld = (taxableOld - 250000) * 0.05;
        taxOld = 0; // Rebate 87A up to 5L
      } else {
        taxOld = 12500; // 5% of 2.5L
        if (taxableOld <= 1000000) {
          taxOld += (taxableOld - 500000) * 0.20;
        } else {
          taxOld += 100000 + ((taxableOld - 1000000) * 0.30);
        }
      }
    }
    const cessOld = taxOld * 0.04;
    const totalTaxOld = taxOld + cessOld;

    // New Regime (FY 2025-26)
    const stdDeductionNew = 75000;
    const taxableNew = Math.max(0, salary - stdDeductionNew);
    let taxNew = 0;
    
    if (taxableNew <= 1200000) {
        taxNew = 0; // Rebate 87A up to 12L
    } else {
        if (taxableNew > 400000) taxNew += Math.min(400000, taxableNew - 400000) * 0.05;
        if (taxableNew > 800000) taxNew += Math.min(400000, taxableNew - 800000) * 0.10;
        if (taxableNew > 1200000) taxNew += Math.min(400000, taxableNew - 1200000) * 0.15;
        if (taxableNew > 1600000) taxNew += Math.min(400000, taxableNew - 1600000) * 0.20;
        if (taxableNew > 2000000) taxNew += Math.min(400000, taxableNew - 2000000) * 0.25;
        if (taxableNew > 2400000) taxNew += (taxableNew - 2400000) * 0.30;
    }
    
    const cessNew = taxNew * 0.04;
    const totalTaxNew = taxNew + cessNew;

    const diff = Math.abs(totalTaxOld - totalTaxNew);
    const winner = totalTaxOld < totalTaxNew ? 'Old Regime' : (totalTaxNew < totalTaxOld ? 'New Regime' : 'Both Same');
    const winnerTax = Math.min(totalTaxOld, totalTaxNew);
    
    return {
      taxableOld, totalTaxOld,
      taxableNew, totalTaxNew,
      diff, winner, winnerTax
    };
  }, [salary, exemptions, deductions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start w-full">
      
      {/* Input Section */}
      <div className="lg:col-span-5 glass-panel p-4 lg:p-5 relative flex flex-col gap-2">
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-1">Your Income & Savings</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Enter your salary and intended deductions to see which regime saves you more tax.</p>
        </div>
        
        <InputSlider label="Gross Annual Salary" value={salary} onChange={setSalary} min={300000} max={5000000} step={50000} prefix="₹" />
        <InputSlider label="Exemptions (HRA, LTA, etc.)" value={exemptions} onChange={setExemptions} min={0} max={1000000} step={10000} prefix="₹" />
        <InputSlider label="Deductions (80C, 80D, etc.)" value={deductions} onChange={setDeductions} min={0} max={1000000} step={10000} prefix="₹" />
        
        <div className="mt-4 p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
                Standard Deduction of ₹75,000 applies to the New Regime (₹50,000 for Old Regime). The New Tax Regime does not allow most deductions (like 80C) or exemptions (like HRA). Under FY 2025-26 rules, income up to ₹12 Lakh is tax-free in the New Regime due to rebate 87A.
            </p>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-7 h-full flex flex-col gap-4">
        
        {/* Winner Banner */}
        <div className="glass-panel p-5 bg-gradient-to-br from-[var(--color-accent)] to-[#1B3A5C] text-white border-0 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="relative z-10 flex flex-col">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Recommendation</span>
                {results.winner === 'Both Same' ? (
                    <div className="text-2xl lg:text-3xl font-extrabold tracking-tight">Taxes are equal</div>
                ) : (
                    <>
                        <div className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
                            Choose the {results.winner}
                        </div>
                        <div className="text-sm font-medium bg-white/20 inline-flex w-max px-3 py-1.5 rounded-full backdrop-blur-sm">
                            You save {formatCurrency(results.diff, 'en-IN', 'INR')} in taxes!
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* Side by side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            
            {/* New Regime Card */}
            <div className={`glass-panel p-5 flex flex-col justify-between transition-all ${results.winner === 'New Regime' ? 'ring-2 ring-[var(--color-accent)] shadow-[0_0_15px_rgba(27,58,92,0.2)] dark:shadow-[0_0_15px_rgba(96,165,250,0.15)]' : 'opacity-80'}`}>
                <div>
                    <div className="flex items-center justify-between mb-4 border-b border-black/5 dark:border-white/10 pb-2">
                        <h3 className="font-bold text-foreground">New Regime</h3>
                        {results.winner === 'New Regime' && <span className="bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Winner</span>}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Gross Income</span>
                            <span className="text-foreground font-medium">{formatCurrency(salary, 'en-IN', 'INR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Standard Deduction</span>
                            <span className="text-foreground font-medium">-₹75,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Deductions/Exemptions</span>
                            <span className="text-foreground font-medium text-opacity-50">Not Allowed</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-black/5 dark:border-white/10">
                            <span className="text-foreground font-semibold">Net Taxable Income</span>
                            <span className="text-foreground font-bold">{formatCurrency(results.taxableNew, 'en-IN', 'INR')}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Total Tax Payable</span>
                    <span className={`text-2xl font-extrabold ${results.winner === 'New Regime' ? 'text-[var(--color-accent)]' : 'text-foreground'}`}>
                        {formatCurrency(results.totalTaxNew, 'en-IN', 'INR')}
                    </span>
                    {results.totalTaxNew === 0 && <span className="text-[10px] text-[#059669] mt-1 font-bold">Tax Free! (Rebate 87A)</span>}
                </div>
            </div>

            {/* Old Regime Card */}
            <div className={`glass-panel p-5 flex flex-col justify-between transition-all ${results.winner === 'Old Regime' ? 'ring-2 ring-[var(--color-accent)] shadow-[0_0_15px_rgba(27,58,92,0.2)] dark:shadow-[0_0_15px_rgba(96,165,250,0.15)]' : 'opacity-80'}`}>
                <div>
                    <div className="flex items-center justify-between mb-4 border-b border-black/5 dark:border-white/10 pb-2">
                        <h3 className="font-bold text-foreground">Old Regime</h3>
                        {results.winner === 'Old Regime' && <span className="bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Winner</span>}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Gross Income</span>
                            <span className="text-foreground font-medium">{formatCurrency(salary, 'en-IN', 'INR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Standard Deduction</span>
                            <span className="text-foreground font-medium">-₹50,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Exemptions & Deductions</span>
                            <span className="text-foreground font-medium">-{formatCurrency(exemptions + deductions, 'en-IN', 'INR')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-black/5 dark:border-white/10">
                            <span className="text-foreground font-semibold">Net Taxable Income</span>
                            <span className="text-foreground font-bold">{formatCurrency(results.taxableOld, 'en-IN', 'INR')}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Total Tax Payable</span>
                    <span className={`text-2xl font-extrabold ${results.winner === 'Old Regime' ? 'text-[var(--color-accent)]' : 'text-foreground'}`}>
                        {formatCurrency(results.totalTaxOld, 'en-IN', 'INR')}
                    </span>
                    {results.totalTaxOld === 0 && <span className="text-[10px] text-[#059669] mt-1 font-bold">Tax Free! (Rebate 87A)</span>}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
