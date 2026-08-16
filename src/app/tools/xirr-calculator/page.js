"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';

// XIRR Calculation logic
const xnpv = (rate, cashFlows) => {
  return cashFlows.reduce((acc, curr) => {
    const timeDiff = (curr.date - cashFlows[0].date) / (1000 * 3600 * 24 * 365);
    return acc + curr.amount / Math.pow(1 + rate, timeDiff);
  }, 0);
};

const xirr = (cashFlows, guess = 0.1) => {
  const maxIters = 100;
  const tolerance = 0.0000001;
  let rate = guess;

  for (let i = 0; i < maxIters; i++) {
    const val = xnpv(rate, cashFlows);
    if (Math.abs(val) < tolerance) return rate;

    const derRate = rate + 0.0001;
    const derVal = xnpv(derRate, cashFlows);
    const deriv = (derVal - val) / 0.0001;
    
    if (deriv === 0) break;
    
    rate = rate - val / deriv;
  }
  return rate; // Return approximate if didn't converge within tolerance
};

export default function XirrCalculatorPage() {
  const [cashFlows, setCashFlows] = useState([
    { id: Date.now(), date: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], amount: -100000 },
    { id: Date.now() + 1, date: new Date().toISOString().split('T')[0], amount: 115000 }
  ]);

  const addCashFlow = () => {
    setCashFlows([...cashFlows, { id: Date.now(), date: new Date().toISOString().split('T')[0], amount: 0 }]);
  };

  const removeCashFlow = (id) => {
    if (cashFlows.length > 2) {
      setCashFlows(cashFlows.filter(cf => cf.id !== id));
    }
  };

  const updateCashFlow = (id, field, value) => {
    setCashFlows(cashFlows.map(cf => {
      if (cf.id === id) {
        return { ...cf, [field]: value };
      }
      return cf;
    }));
  };

  const result = useMemo(() => {
    try {
      // Validate cash flows
      const parsedFlows = cashFlows.map(cf => ({
        date: new Date(cf.date),
        amount: parseFloat(cf.amount)
      })).filter(cf => !isNaN(cf.amount) && !isNaN(cf.date.getTime()));

      if (parsedFlows.length < 2) return null;

      // Sort by date
      parsedFlows.sort((a, b) => a.date - b.date);

      // Need at least one positive and one negative cash flow
      const hasPositive = parsedFlows.some(cf => cf.amount > 0);
      const hasNegative = parsedFlows.some(cf => cf.amount < 0);

      if (!hasPositive || !hasNegative) return null;

      const rate = xirr(parsedFlows);
      
      const totalInvested = parsedFlows.filter(cf => cf.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
      const currentValuation = parsedFlows.filter(cf => cf.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
      const netGain = currentValuation - totalInvested;

      return {
        xirr: (rate * 100).toFixed(2),
        totalInvested,
        currentValuation,
        netGain
      };
    } catch (e) {
      return null;
    }
  }, [cashFlows]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#f8f2ea] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] text-center mb-8">Mutual Fund XIRR Calculator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl bg-[#f8f2ea] shadow-lg border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#1F2937] flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#1B3A5C]" />
                  Cash Flows
                </h2>
                <button 
                  onClick={addCashFlow}
                  className="flex items-center gap-2 text-sm bg-[#1B3A5C] text-white hover:bg-[#112740] px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-[#6B7280] px-2">
                  <div className="col-span-5 md:col-span-4">Date</div>
                  <div className="col-span-5 md:col-span-6">Amount (₹)</div>
                  <div className="col-span-2 text-center">Action</div>
                </div>

                {cashFlows.map((cf, index) => (
                  <div key={cf.id} className="grid grid-cols-12 gap-4 items-center bg-white/50 p-3 rounded-xl">
                    <div className="col-span-5 md:col-span-4">
                      <input 
                        type="date" 
                        value={cf.date}
                        onChange={(e) => updateCashFlow(cf.id, 'date', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-6">
                      <input 
                        type="number" 
                        value={cf.amount}
                        onChange={(e) => updateCashFlow(cf.id, 'amount', e.target.value)}
                        placeholder="e.g. -10000 for investment"
                        className={`w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20 ${parseFloat(cf.amount) < 0 ? 'text-[#991B1B]' : 'text-[#059669]'}`}
                      />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button 
                        onClick={() => removeCashFlow(cf.id)}
                        disabled={cashFlows.length <= 2}
                        className="p-2 text-gray-400 hover:text-[#991B1B] hover:bg-[#991B1B]/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Remove row"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-[#1B3A5C]/5 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[#1B3A5C] shrink-0 mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Tip:</strong> Enter investments as <span className="text-[#991B1B] font-medium">negative</span> numbers (e.g. -10,000) and withdrawals or current valuation as <span className="text-[#059669] font-medium">positive</span> numbers (e.g. 15,000).
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl bg-[#f8f2ea] shadow-lg border border-white/20 sticky top-8">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Investment Summary</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-white/60 rounded-xl border border-[#1B3A5C]/10">
                    <p className="text-[#6B7280] text-sm font-medium mb-1">Annualized Return (XIRR)</p>
                    <p className={`text-4xl font-bold ${parseFloat(result.xirr) >= 0 ? 'text-[#059669]' : 'text-[#991B1B]'}`}>
                      {result.xirr}%
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-[#6B7280]">Total Invested</span>
                      <span className="font-bold text-[#1B3A5C]">{formatCurrency(result.totalInvested)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-[#6B7280]">Current Value</span>
                      <span className="font-bold text-[#1F2937]">{formatCurrency(result.currentValuation)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6B7280]">Total Returns</span>
                      <span className={`font-bold ${result.netGain >= 0 ? 'text-[#059669]' : 'text-[#991B1B]'}`}>
                        {result.netGain > 0 ? '+' : ''}{formatCurrency(result.netGain)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-white/60 rounded-xl border border-gray-200 flex flex-col items-center justify-center min-h-[200px]">
                  <p className="text-[#6B7280]">
                    Enter at least one investment (negative) and one return (positive) amount to calculate XIRR.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
