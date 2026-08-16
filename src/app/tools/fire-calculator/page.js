"use client";

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InputSlider from '@/components/InputSlider';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FireCalculatorPage() {
    const [annualExpenses, setAnnualExpenses] = useState(1200000);
    const [swr, setSwr] = useState(4);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(45);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [currentSavings, setCurrentSavings] = useState(0);

    const [results, setResults] = useState({
        targetCorpus: 0,
        sipNeeded: 0,
        totalInvested: 0,
        wealthGained: 0
    });

    useEffect(() => {
        const corpus = annualExpenses / (swr / 100);
        const years = Math.max(0, retirementAge - currentAge);
        const months = years * 12;
        const r = expectedReturn / 12 / 100;
        
        let fvSavings = currentSavings * Math.pow(1 + (expectedReturn/100), years);
        let remainingCorpus = Math.max(0, corpus - fvSavings);
        let sip = 0;
        
        if (months > 0 && r > 0) {
            // SIP calculation formula: P = FV / [ ( ( (1 + r)^n - 1 ) / r ) * (1 + r) ]
            sip = remainingCorpus / ( ( (Math.pow(1 + r, months) - 1) / r ) * (1 + r) );
        } else if (months > 0 && r === 0) {
            sip = remainingCorpus / months;
        }

        const invested = currentSavings + (sip * months);
        const gained = corpus - invested;

        setResults({
            targetCorpus: corpus,
            sipNeeded: sip,
            totalInvested: invested,
            wealthGained: gained
        });
    }, [annualExpenses, swr, currentAge, retirementAge, expectedReturn, currentSavings]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const chartData = {
        labels: ['Total Invested', 'Wealth Gained'],
        datasets: [
            {
                data: [results.totalInvested, results.wealthGained > 0 ? results.wealthGained : 0],
                backgroundColor: ['#1B3A5C', '#C4993C'], // Navy and Gold
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#f8f2ea] p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">FIRE Calculator</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Calculate the corpus required for Financial Independence and Retire Early (FIRE) and find out the monthly SIP needed to reach your goal.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Inputs Section */}
                    <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl bg-white shadow-xl">
                        <div className="space-y-6">
                            <InputSlider
                                label="Annual Expenses (₹)"
                                value={annualExpenses}
                                onChange={setAnnualExpenses}
                                min={100000}
                                max={10000000}
                                step={10000}
                                prefix="₹"
                            />
                            
                            <InputSlider
                                label="Safe Withdrawal Rate (%)"
                                value={swr}
                                onChange={setSwr}
                                min={1}
                                max={10}
                                step={0.1}
                                suffix="%"
                            />

                            <InputSlider
                                label="Current Age (Years)"
                                value={currentAge}
                                onChange={setCurrentAge}
                                min={18}
                                max={60}
                                step={1}
                            />

                            <InputSlider
                                label="Retirement Age (Years)"
                                value={retirementAge}
                                onChange={setRetirementAge}
                                min={currentAge + 1}
                                max={70}
                                step={1}
                            />

                            <InputSlider
                                label="Expected Return (%)"
                                value={expectedReturn}
                                onChange={setExpectedReturn}
                                min={1}
                                max={30}
                                step={0.5}
                                suffix="%"
                            />

                            <InputSlider
                                label="Current Savings (₹)"
                                value={currentSavings}
                                onChange={setCurrentSavings}
                                min={0}
                                max={50000000}
                                step={50000}
                                prefix="₹"
                            />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="glass-panel p-6 rounded-2xl bg-[#1B3A5C] text-white shadow-xl">
                            <h3 className="text-lg font-medium opacity-90 mb-2">Target FIRE Corpus</h3>
                            <div className="text-4xl font-bold mb-4">{formatCurrency(results.targetCorpus)}</div>
                            <div className="pt-4 border-t border-white/20">
                                <p className="text-sm opacity-80 mb-1">Required Monthly SIP</p>
                                <p className="text-2xl font-semibold text-[#059669] bg-white inline-block px-3 py-1 rounded-lg">
                                    {formatCurrency(results.sipNeeded)}
                                </p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl bg-white shadow-xl">
                            <h3 className="text-xl font-bold text-[#1F2937] mb-6">Investment Breakdown</h3>
                            
                            <div className="w-48 h-48 mx-auto mb-6">
                                <Pie 
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false }
                                        }
                                    }}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[#f8f2ea] rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#1B3A5C]"></div>
                                        <span className="text-gray-600">Total Invested</span>
                                    </div>
                                    <span className="font-semibold text-[#1B3A5C]">
                                        {formatCurrency(results.totalInvested)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center p-3 bg-[#f8f2ea] rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#C4993C]"></div>
                                        <span className="text-gray-600">Wealth Gained</span>
                                    </div>
                                    <span className="font-semibold text-[#059669]">
                                        {formatCurrency(results.wealthGained)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
