"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendingUp, Coins, Zap } from 'lucide-react';
import { formatToShortWords } from '../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

export default function CAGRResultSection({ results }) {
  const {
    cagr, cagrPct, absoluteGain, gainPct,
    initialInvestment, finalValue, duration, yearlyData,
  } = results;

  // Colour palette
  const colorInvested = '#3B82F6';
  const colorGains    = '#22C55E';
  const cagrColor     = cagrPct >= 15 ? '#22C55E' : cagrPct >= 8 ? '#8b5cf6' : '#f59e0b';

  const pieData = {
    labels: ['Initial Investment', 'Gains Earned'],
    datasets: [{
      data: [initialInvestment, Math.max(0, absoluteGain)],
      backgroundColor: [colorInvested, colorGains],
      borderColor:     ['#0f111a', '#0f111a'],
      borderWidth:     4,
      hoverOffset:     4,
    }],
  };

  const pieOptions = {
    responsive:          true,
    maintainAspectRatio: false,
    cutout:              '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            let label = ctx.label || '';
            if (label) label += ': ';
            if (ctx.raw !== null) {
              label += formatCurrency(ctx.raw);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="glass-panel p-5 lg:p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

      {/* ── HERO: CAGR % badge + Pie chart ── */}
      <div className="flex-1 min-h-[220px] mb-4 relative z-10 flex flex-col items-center justify-center">

        {/* CAGR badge above the pie */}
        <div className="mb-3 text-center">
          <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-1">CAGR</p>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-2xl"
            style={{
              background: `${cagrColor}22`,
              border:     `1px solid ${cagrColor}55`,
              color:      cagrColor,
              boxShadow:  `0 0 20px ${cagrColor}33`,
            }}
          >
            <TrendingUp className="w-5 h-5" />
            {cagrPct}%
            <span className="text-sm font-medium opacity-70">p.a.</span>
          </div>
        </div>

        {/* Doughnut chart */}
        <div className="relative w-[180px] h-[180px]">
          <Doughnut data={pieData} options={pieOptions} />

          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-400">Final Value</span>
            <span className="text-base font-extrabold text-white leading-tight">
              {formatCurrency(finalValue)}
            </span>
            <span className="text-[9px] text-[#c4b5fd]">{formatToShortWords(finalValue)}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colorInvested }} />
            <span className="text-gray-400">Invested</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colorGains }} />
            <span className="text-gray-400">Gains</span>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-3 gap-2 relative z-10">

        {/* Total Gain */}
        <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] rounded-lg p-2 flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <div className="flex items-center text-[#d8b4fe] text-[10px] mb-0.5 font-medium">
            <Zap className="w-3 h-3 mr-1" />
            Gain ({gainPct}%)
          </div>
          <div className="text-sm font-extrabold text-white">+{formatCurrency(absoluteGain)}</div>
          <div className="text-[9px] text-[#c4b5fd] mt-0.5 tracking-wide">{formatToShortWords(absoluteGain)}</div>
        </div>

        {/* Initial Investment */}
        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1.5" />
            Invested
          </div>
          <div className="text-sm font-bold text-white">{formatCurrency(initialInvestment)}</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(initialInvestment)}</div>
        </div>

        {/* Duration */}
        <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <Coins className="w-3 h-3 mr-1" />
            Duration
          </div>
          <div className="text-sm font-bold text-white">{duration} Yr</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">
            {duration === 1 ? '12 months' : `${duration * 12} months`}
          </div>
        </div>
      </div>
    </div>
  );
}
