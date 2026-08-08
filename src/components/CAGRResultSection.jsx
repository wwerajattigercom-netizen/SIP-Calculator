"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, Coins, Zap, AlertTriangle } from 'lucide-react';
import { formatToShortWords } from '../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const fmt = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

export default function CAGRResultSection({ results }) {
  const {
    cagr, cagrPct, absoluteGain, gainPct,
    totalInvested, initialInvestment, monthlySip,
    finalValue, duration, yearlyData,
  } = results;

  const sipContributions = monthlySip * duration * 12;
  const cagrColor =
    cagrPct >= 15 ? '#22C55E' :
    cagrPct >= 8  ? '#8b5cf6' :
                    '#f59e0b';

  const isNegativeGain = absoluteGain < 0;

  // Pie: 2 segments when no SIP, 3 when SIP is set
  const pieLabels = monthlySip > 0
    ? ['Lump Sum Invested', 'Monthly SIP Total', 'Gains Earned']
    : ['Initial Investment', 'Gains Earned'];

  const pieRawData = monthlySip > 0
    ? [initialInvestment, sipContributions, Math.max(0, absoluteGain)]
    : [initialInvestment, Math.max(0, absoluteGain)];

  const pieColors = monthlySip > 0
    ? ['#3B82F6', '#a78bfa', '#22C55E']
    : ['#3B82F6', '#22C55E'];

  const pieData = {
    labels: pieLabels,
    datasets: [{
      data:            pieRawData,
      backgroundColor: pieColors,
      borderColor:     '#0f111a',
      borderWidth:     4,
      hoverOffset:     6,
    }],
  };

  const pieOptions = {
    responsive:          true,
    maintainAspectRatio: false,
    cutout:              '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${fmt(ctx.raw)}`,
        },
      },
    },
  };

  return (
    <div className="glass-panel p-5 lg:p-6 flex flex-col h-full relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

      {/* ── CAGR hero badge ── */}
      <div className="flex flex-col items-center mb-4 relative z-10">
        <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-2">
          {monthlySip > 0 ? 'Effective CAGR (Lump Sum + SIP)' : 'CAGR'}
        </p>
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-2xl"
          style={{
            background: `${cagrColor}1a`,
            border:     `1.5px solid ${cagrColor}55`,
            color:      cagrColor,
            boxShadow:  `0 0 24px ${cagrColor}33`,
          }}
        >
          <TrendingUp className="w-5 h-5" />
          {isNegativeGain ? cagrPct : `${cagrPct}`}%
          <span className="text-sm font-medium opacity-70">p.a.</span>
        </div>

        {isNegativeGain && (
          <div className="mt-2 flex items-center gap-1.5 text-orange-400 text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            Loss — Final value is less than total invested
          </div>
        )}
      </div>

      {/* ── Doughnut pie chart ── */}
      <div className="flex flex-col items-center mb-4 relative z-10">
        <div className="relative w-[180px] h-[180px]">
          <Doughnut data={pieData} options={pieOptions} />
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-400">Final Value</span>
            <span className="text-base font-extrabold text-white leading-tight">{fmt(finalValue)}</span>
            <span className="text-[9px] text-[#c4b5fd]">{formatToShortWords(finalValue)}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs">
          {pieLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: pieColors[i] }} />
              <span className="text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-2 relative z-10">

        {/* Gain */}
        <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] rounded-lg p-2 flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <div className="flex items-center text-[#d8b4fe] text-[10px] mb-0.5 font-medium">
            <Zap className="w-3 h-3 mr-1" />
            Gain ({gainPct}%)
          </div>
          <div className={`text-sm font-extrabold ${isNegativeGain ? 'text-orange-400' : 'text-white'}`}>
            {isNegativeGain ? '' : '+'}{fmt(absoluteGain)}
          </div>
          <div className={`text-[9px] mt-0.5 tracking-wide ${isNegativeGain ? 'text-orange-500' : 'text-[#c4b5fd]'}`}>
            {formatToShortWords(Math.abs(absoluteGain))}
          </div>
        </div>

        {/* Total Invested */}
        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1.5" />
            Invested
          </div>
          <div className="text-sm font-bold text-white">{fmt(totalInvested)}</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(totalInvested)}</div>
        </div>

        {/* Duration */}
        <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <Coins className="w-3 h-3 mr-1" />
            Duration
          </div>
          <div className="text-sm font-bold text-white">{duration} Yr</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{duration * 12} months</div>
        </div>

        {/* SIP total strip — only when SIP is set */}
        {monthlySip > 0 && (
          <div className="col-span-3 mt-1 bg-[rgba(167,139,250,0.1)] border border-[rgba(167,139,250,0.3)] rounded-lg px-3 py-2 flex items-center justify-between">
            <div>
              <p className="text-[#a78bfa] text-[10px] font-semibold">Monthly SIP Contribution</p>
              <p className="text-gray-500 text-[9px]">{fmt(monthlySip)}/mo × {duration * 12} months</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">{fmt(sipContributions)}</div>
              <div className="text-[9px] text-[#c4b5fd]">{formatToShortWords(sipContributions)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
