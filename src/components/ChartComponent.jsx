"use client";

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { Zap } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// Speed badge color: fastest = most green, slowest = most red/orange
function speedColor(idx, total) {
  if (idx === 0) return { bg: 'rgba(196,153,60,0.15)', border: 'rgba(196,153,60,0.4)', text: '#fb923c' };
  if (idx === total - 1) return { bg: 'rgba(13,148,136,0.15)', border: 'rgba(13,148,136,0.4)', text: '#4ade80' };
  return { bg: 'rgba(27,58,92,0.15)', border: 'rgba(27,58,92,0.4)', text: '#1B3A5C' };
}

export default function ChartComponent({ results }) {
  const [chartType, setChartType] = useState('pie'); // 'pie' | 'line' | 'milestones'

  const colorInvested = '#1B3A5C';
  const colorReturns = '#C4993C';
  const colorGrid = 'rgba(0,0,0,0.05)';
  const colorText = '#6B7280';

  const pieData = {
    labels: ['Invested Amount', 'Est. Returns'],
    datasets: [
      {
        data: [results.totalInvested, results.amountEarned],
        backgroundColor: [colorInvested, colorReturns],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || '';
            if (label) label += ': ';
            if (context.raw !== null) {
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency', currency: 'INR', maximumFractionDigits: 0
              }).format(context.raw);
            }
            return label;
          }
        }
      }
    },
  };

  const lineData = {
    labels: results.chartData.map(d => `Year ${Math.round(d.year)}`),
    datasets: [
      {
        label: 'Total Invested',
        data: results.chartData.map(d => d.invested),
        borderColor: colorInvested,
        backgroundColor: colorInvested,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        label: 'Wealth Value',
        data: results.chartData.map(d => d.balance),
        borderColor: colorReturns,
        backgroundColor: colorReturns,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: colorGrid, drawBorder: false },
        ticks: { color: colorText, maxTicksLimit: 6 }
      },
      y: {
        grid: { color: colorGrid, drawBorder: false },
        ticks: {
          color: colorText,
          callback: (value) => `₹${(value / 100000).toFixed(1)}L`
        }
      }
    }
  };

  const milestones = results.milestones || [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Tab bar */}
      <div className="flex bg-[rgba(0,0,0,0.03)] p-1 rounded-lg mb-2 w-full max-w-[320px]">
        {[
          { key: 'pie', label: 'Pie Chart' },
          { key: 'line', label: 'Line Chart' },
          { key: 'milestones', label: '₹1Cr Table' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
              chartType === key
                ? 'bg-[#1B3A5C] text-white shadow-lg'
                : 'text-gray-500 hover:text-[#1F2937]'
            }`}
            onClick={() => setChartType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="relative w-full flex-1 min-h-[220px] flex justify-center items-center overflow-hidden">

        {chartType === 'pie' && (
          <>
            <Doughnut data={pieData} options={pieOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500 font-medium">Total Value</span>
              <span className="text-lg md:text-xl font-bold text-[#1F2937]">
                ₹{results.actualAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </>
        )}

        {chartType === 'line' && (
          <Line data={lineData} options={lineOptions} />
        )}

        {chartType === 'milestones' && (
          <div className="w-full h-full absolute inset-0 flex flex-col px-1 py-1">
            {milestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 text-sm">
                <Zap className="w-8 h-8 mb-2 text-gray-600" />
                <p>Increase the time period or SIP amount<br />to see crore milestones.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <p className="text-[10px] text-gray-500 text-center mb-2 flex-shrink-0">
                  Each crore arrives <span className="text-[#1B3A5C] font-semibold">faster</span> — the compounding acceleration effect.
                </p>

                {/* Scrollable table wrapper */}
                <div className="flex-1 overflow-y-auto min-h-0 rounded-lg border border-white border-opacity-5">
                  <table className="w-full text-xs border-collapse">
                    <thead className="sticky top-0 bg-[#F8F6F3] z-10">
                      <tr className="border-b border-white border-opacity-10">
                        <th className="text-left text-gray-500 font-medium py-2 pr-2 pl-2">Milestone</th>
                        <th className="text-center text-gray-500 font-medium py-2 px-2">Reached At</th>
                        <th className="text-center text-gray-500 font-medium py-2 px-2">Time Taken</th>
                        <th className="text-right text-gray-500 font-medium py-2 pl-2 pr-2">Pace</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestones.map((m, i) => {
                        const colors = speedColor(i, milestones.length);
                        const isFastest = i === milestones.length - 1 && milestones.length > 1;
                        const isSlowest = i === 0;
                        return (
                          <tr
                            key={i}
                            className="border-b border-white border-opacity-5 hover:bg-white hover:bg-opacity-5 transition-colors"
                          >
                            <td className="py-2 pr-2 pl-2">
                              <div className="flex items-center gap-1.5">
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                                  style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                                >
                                  {m.crore}
                                </div>
                                <span className="text-[#1F2937] font-semibold">₹{m.crore} Cr</span>
                              </div>
                            </td>
                            <td className="py-2 px-2 text-center text-gray-600">Yr {m.yearReached.toFixed(1)}</td>
                            <td className="py-2 px-2 text-center">
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{ background: colors.bg, color: colors.text }}
                              >
                                {m.yearsSinceLast.toFixed(1)} yrs
                              </span>
                            </td>
                            <td className="py-2 pl-2 pr-2 text-right">
                              {isSlowest && milestones.length > 1 && (
                                <span className="text-[9px] text-[#059669] font-medium">Slowest</span>
                              )}
                              {isFastest && (
                                <span className="text-[9px] text-[#0D9488] font-medium flex items-center justify-end gap-0.5">
                                  <Zap className="w-2.5 h-2.5" />Fastest
                                </span>
                              )}
                              {!isSlowest && !isFastest && (
                                <span className="text-[9px] text-[#1B3A5C]">
                                  {i === 1 ? '2× faster' : `${i + 1}× faster`}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
