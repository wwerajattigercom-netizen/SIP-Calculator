"use client";
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { ArrowRight, RefreshCw, PlusCircle, Shield } from 'lucide-react';

export default function SipVsStpPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA vs STP' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-[#059669] font-semibold mb-3 block">Strategy Guide</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
            DCA vs STP: How to Invest a Lump Sum Safely
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            If you have a monthly salary, you use a DCA. But what if you just received a huge bonus or sold a property? That is where an STP (Systematic Transfer Plan) comes in.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. What is an STP?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          STP stands for <strong>Systematic Transfer Plan</strong>. It allows you to invest a lump sum amount into a safe, low-risk fund (like a Liquid or Debt fund), and then automatically transfer a fixed amount every month into a high-risk, high-reward Equity fund.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-8">2. The Problem with Investing a Lump Sum</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Imagine you have $100,000. If you invest it all in an Equity fund today, and the market crashes 10% tomorrow, you immediately lose $10,000. 
          <br/><br/>
          To avoid this "timing risk", you can use an STP.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-8">3. How an STP Works (Example)</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li>You put your $100,000 into a Debt Fund (which earns around 6-7% safely).</li>
          <li>You set up an STP to transfer $10,000 every month from the Debt Fund to an Equity Fund.</li>
          <li>Over 10 months, your money slowly enters the stock market.</li>
          <li>You get the benefits of Dollar Cost Averaging (just like a DCA), but your un-invested money earns more interest than it would in a regular savings account!</li>
        </ol>

        <h2 className="text-xl font-bold text-foreground mt-8">4. DCA vs STP Summary</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-2 pr-4 font-semibold text-foreground">Feature</th>
                <th className="py-2 pr-4 font-semibold text-[#059669]">DCA</th>
                <th className="py-2 font-semibold text-[#C4993C]">STP</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-[#E8E4DF]">
                <td className="py-2 pr-4 font-medium">Source of Funds</td>
                <td className="py-2 pr-4">Your Bank Account</td>
                <td className="py-2">A Liquid/Debt Mutual Fund</td>
              </tr>
              <tr className="border-b border-[#E8E4DF]">
                <td className="py-2 pr-4 font-medium">Best For</td>
                <td className="py-2 pr-4">Salaried people (monthly income)</td>
                <td className="py-2">People with a large lump sum</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Return on Uninvested Money</td>
                <td className="py-2 pr-4">Low (Savings Account interest: 3-4%)</td>
                <td className="py-2">Higher (Debt Fund interest: 6-7%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
