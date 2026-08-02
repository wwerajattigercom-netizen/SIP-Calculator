"use client";

import React from 'react';
import { formatToShortWords } from '../utils/formatters';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

/**
 * Creative Time-to-Goal display.
 * Shows the calculated duration centre-stage, along with summary stats.
 * Replaces the Pie/Line/Milestones chart on the goal calculator page.
 */
export default function TimeToGoalDisplay({ results }) {
  const { reachable, years, months, totalInvestedAtGoal, balanceAtGoal, gainsAtGoal, inflationAdjustedGoal } = results;

  if (!reachable) {
    return (
      <div className="glass-panel p-5 lg:p-6 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />
        <AlertTriangle className="w-12 h-12 text-orange-400 mb-4" />
        <p className="text-orange-400 font-bold text-base text-center mb-2">Goal not reachable in 50 years</p>
        <p className="text-gray-500 text-xs text-center max-w-xs leading-relaxed">
          Increase your monthly SIP, add a lump sum, raise the step-up %, or lower your target goal to see a realistic timeline.
        </p>
      </div>
    );
  }

  const totalYears = years + months / 12;

  // Progress arc — visual representation of time (shorter = greener)
  const progressPct = Math.min(100, (totalYears / 30) * 100);
  const arcColor = totalYears <= 10 ? '#22C55E' : totalYears <= 20 ? '#8b5cf6' : '#f59e0b';
  const arcLabel = totalYears <= 10 ? 'Excellent pace!' : totalYears <= 20 ? 'On track' : 'Consider step-up SIP';

  // SVG arc computation
  const radius   = 68;
  const cx       = 100;
  const cy       = 100;
  const circ     = 2 * Math.PI * radius;
  const filled   = circ * (progressPct / 100);
  const dasharray = `${filled} ${circ - filled}`;
  const startAngle = -90; // start at top

  return (
    <div className="glass-panel p-5 lg:p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

      {/* ── HERO: Circular time display ── */}
      <div className="flex flex-col items-center justify-center mb-4 relative z-10">
        <p className="text-gray-400 text-xs font-medium mb-3 tracking-widest uppercase">Time to reach your goal</p>

        <div className="relative w-[200px] h-[200px] flex-shrink-0">
          {/* SVG Circular arc */}
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {/* Background track */}
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="12"
            />
            {/* Filled arc */}
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={arcColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={dasharray}
              strokeDashoffset="0"
              style={{ filter: `drop-shadow(0 0 8px ${arcColor}88)`, transition: 'stroke-dasharray 0.6s ease' }}
            />
          </svg>

          {/* Centre text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {years > 0 && (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white leading-none">{years}</span>
                <span className="text-sm text-gray-400 font-medium">yr</span>
              </div>
            )}
            {months > 0 && (
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-bold leading-none" style={{ color: arcColor }}>{months}</span>
                <span className="text-xs text-gray-400 font-medium">mo</span>
              </div>
            )}
            {years === 0 && months > 0 && (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white leading-none">{months}</span>
                <span className="text-sm text-gray-400 font-medium">mo</span>
              </div>
            )}
          </div>
        </div>

        {/* Pace badge */}
        <div
          className="mt-2 px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: `${arcColor}22`, color: arcColor, border: `1px solid ${arcColor}44` }}
        >
          {arcLabel}
        </div>
      </div>

      {/* ── STATS BREAKDOWN ── */}
      <div className="grid grid-cols-3 gap-2 relative z-10">
        <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] rounded-lg p-2 flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <div className="text-[#d8b4fe] text-[10px] mb-0.5 font-medium">Goal Corpus</div>
          <div className="text-sm font-extrabold text-white">{formatCurrency(balanceAtGoal)}</div>
          <div className="text-[9px] text-[#c4b5fd] mt-0.5 tracking-wide">{formatToShortWords(balanceAtGoal)}</div>
        </div>

        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="text-gray-400 text-[10px] mb-0.5">Total Invested</div>
          <div className="text-sm font-bold text-white">{formatCurrency(totalInvestedAtGoal)}</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(totalInvestedAtGoal)}</div>
        </div>

        <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="text-gray-400 text-[10px] mb-0.5">Returns Earned</div>
          <div className="text-sm font-bold text-white">+{formatCurrency(gainsAtGoal)}</div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(gainsAtGoal)}</div>
        </div>

        {/* Inflation adjusted — full width yellow strip */}
        {inflationAdjustedGoal < balanceAtGoal && (
          <div className="col-span-3 mt-1 bg-[rgba(234,179,8,0.2)] border border-[rgba(234,179,8,0.5)] rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span className="text-white text-[10px] font-semibold tracking-wide">Goal in Today's Value (Inflation)</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-white">{formatCurrency(inflationAdjustedGoal)}</div>
              <div className="text-[9px] text-white opacity-70 tracking-wide">{formatToShortWords(inflationAdjustedGoal)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
