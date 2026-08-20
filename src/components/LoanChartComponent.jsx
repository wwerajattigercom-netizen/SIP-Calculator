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
  Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { ArrowDownRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRegion } from '../context/RegionContext';
import { formatCurrency, formatToShortWords } from '../utils/formatters';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

export default function LoanChartComponent({ results }) {
  const [chartType, setChartType] = useState('pie'); // 'pie' | 'line' | 'table'
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { locale, currencyCode, currencySymbol, terms, isUS } = useRegion();
  
  React.useEffect(() => setMounted(true), []);
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = mounted && currentTheme === 'dark';

  const colorPrincipal = 'var(--color-accent)';
  const colorInterest = '#991B1B'; // Dark Red
  const colorGrid = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
  const colorText = isDark ? '#9CA3AF' : '#6B7280';

  if (!results || !results.amortizationSchedule) return null;

  const pieData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [results.loanAmount, results.totalInterest],
        backgroundColor: [colorPrincipal, colorInterest],
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 0,
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
              label += formatCurrency(context.raw, locale, currencyCode);
            }
            return label;
          }
        }
      }
    },
  };

  const lineData = {
    labels: results.amortizationSchedule.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: results.amortizationSchedule.map(d => d.remainingBalance),
        borderColor: colorPrincipal,
        backgroundColor: isDark ? 'rgba(26,115,232,0.1)' : 'rgba(27,58,92,0.1)',
        fill: true,
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
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw, locale, currencyCode)}`
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
          callback: (value) => formatToShortWords(value, isUS)
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Tab bar */}
      <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg mb-2 w-full max-w-[320px]">
        {[
          { key: 'pie', label: 'Pie Chart' },
          { key: 'line', label: 'Balance Graph' },
          { key: 'table', label: `Amortization` },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`flex-1 min-h-[36px] py-1 rounded-md text-[11px] font-medium transition-all ${
              chartType === key
                ? 'bg-[var(--color-accent)] text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setChartType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="relative w-full flex-1 min-h-[180px] flex justify-center items-center overflow-hidden">
        {chartType === 'pie' && (
          <>
            <Doughnut data={pieData} options={pieOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Interest Ratio</span>
              <span className="text-lg md:text-xl font-bold text-[#991B1B]">
                {((results.totalInterest / results.totalPayable) * 100).toFixed(1)}%
              </span>
            </div>
          </>
        )}

        {chartType === 'line' && (
          <Line data={lineData} options={lineOptions} />
        )}

        {chartType === 'table' && (
          <div className="w-full h-full absolute inset-0 flex flex-col px-1 py-1">
            <div className="flex-1 overflow-y-auto min-h-0 rounded-lg border border-black/5 dark:border-white/10">
              <table className="w-full text-xs border-collapse">
                <thead className="sticky top-0 bg-[var(--background)] z-10">
                  <tr className="border-b border-black/5 dark:border-white/10">
                    <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2 pr-2 pl-2">Year</th>
                    <th className="text-right text-[var(--color-accent)] font-medium py-2 px-2">Principal</th>
                    <th className="text-right text-[#991B1B] font-medium py-2 px-2">Interest</th>
                    <th className="text-right text-gray-500 dark:text-gray-400 font-medium py-2 pl-2 pr-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortizationSchedule.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-2 pr-2 pl-2 text-foreground font-semibold">{row.year}</td>
                      <td className="py-2 px-2 text-right text-[var(--color-accent)]">{formatCurrency(row.principalPaid, locale, currencyCode)}</td>
                      <td className="py-2 px-2 text-right text-[#991B1B]">{formatCurrency(row.interestPaid, locale, currencyCode)}</td>
                      <td className="py-2 pl-2 pr-2 text-right text-foreground font-medium">{formatCurrency(row.remainingBalance, locale, currencyCode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
