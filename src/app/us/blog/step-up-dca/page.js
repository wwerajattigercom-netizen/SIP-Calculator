"use client";
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { ArrowRight, TrendingUp, ArrowUpCircle } from 'lucide-react';

export default function StepUpSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Step-Up DCA Guide' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-[#059669] font-semibold mb-3 block">Wealth Multiplier</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
            Step-Up DCA: The Secret to Retiring Early
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Also known as a Top-Up DCA, this simple strategy allows you to start small and automatically increase your investment as your salary grows.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. What is a Step-Up DCA?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          When you set up a Step-Up DCA, you commit to increasing your investment amount by a certain percentage every year (e.g., 10%). 
          <br/><br/>
          Because your salary usually increases by 8-12% every year, it makes sense that your investments should increase by the same proportion to combat inflation.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-8">2. The Mathematics of a 10% Top-Up</h2>
        <div className="bg-[rgba(5,150,105,0.05)] border border-[#059669]/20 p-5 rounded-xl">
          <h3 className="text-[#059669] font-bold flex items-center gap-2 mb-4">
            <ArrowUpCircle className="w-5 h-5" /> The $1,000 Challenge
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Let's see what happens if you invest $1,000 per month for 20 years (at 12% returns):
          </p>
          <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><strong>Normal DCA:</strong> You end up with <strong>$1,000,000</strong>.</li>
            <li><strong>10% Step-Up DCA:</strong> You end up with <strong>$2,000,000</strong>.</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            By simply increasing your investment by 10% every year, you nearly doubled your final wealth!
          </p>
        </div>

        <h2 className="text-xl font-bold text-foreground mt-8">3. Should You Use It?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Absolutely. You can calculate the exact effect of a Step-Up DCA using the calculator on our homepage. We highly recommend starting with a 10% annual top-up.
        </p>
      </div>
    </main>
  );
}
