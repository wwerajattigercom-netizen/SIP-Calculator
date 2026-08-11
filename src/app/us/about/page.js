"use client";
import Link from 'next/link';
import { TrendingUp, Calculator, Target, Mail, ExternalLink, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const TOOLS = [
  {
    href: '/',
    icon: <Calculator className="w-5 h-5 text-[var(--color-accent)]" />,
    name: 'DCA Calculator with Step-Up & Inflation',
    desc: 'Monthly DCA with annual step-up, lump sum, inflation adjustment, and ₹1 Crore milestone tracker.',
  },
  {
    href: '/target-amount-calculator',
    icon: <Target className="w-5 h-5 text-[var(--color-accent)]" />,
    name: 'DCA Goal / Time-to-Target Calculator',
    desc: 'Set your target corpus (e.g., ₹1 Crore) and find how long your DCA will take — or what DCA amount you need.',
  },
  {
    href: '/cagr-calculator',
    icon: <TrendingUp className="w-5 h-5 text-[#0D9488]" />,
    name: 'CAGR Calculator',
    desc: 'Compound Annual Growth Rate calculator for lump sum investments and DCA+lumpsum portfolios. Includes Rule of 72.',
  },
  {
    href: '/lumpsum-calculator',
    icon: <Calculator className="w-5 h-5 text-[#059669]" />,
    name: 'Lumpsum Calculator',
    desc: 'Calculate future value of a one-time lump sum investment at a given annual return rate.',
  },
];

const VALUES = [
  'No sign-up, no login, no email required',
  'Zero ads — clean, distraction-free interface',
  'Formula methodology is transparent and documented',
  'Follows SEBI/AMFI standard APR convention for Indian DCA',
  'Real-time calculation — results update as you slide',
  'Works on mobile, tablet and desktop at any zoom level',
];

export default function AboutPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto space-y-8">

        <Breadcrumb items={[{ label: 'About' }]} />

        {/* Hero */}
        <div className="glass-panel p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B3A5C] to-[#1B3A5C] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              About StepupCalculator 
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
              Free, accurate, and beautifully designed financial calculators
              built specifically for Indian investors — with zero clutter.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Why I Built This</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            Most DCA calculators online are either too basic (no step-up, no inflation) or buried
            inside apps that require sign-up. I wanted a single, fast, honest tool that shows the
            real numbers — including how inflation erodes your returns and how a small annual
            step-up dramatically changes your final corpus.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            StepupCalculator is built with full transparency. The formula used for DCA calculations
            follows the <strong className="text-foreground">SEBI/AMFI standard</strong> — APR-based monthly
            compounding with DCA invested at the beginning of each month. This matches how Indian
            mutual fund industry projections are made.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
            All tools are completely free, open in your browser with no login, and update in real
            time as you move the sliders.
          </p>
          <div className="pt-2 border-t border-[#E8E4DF]">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Built by <span className="text-foreground font-semibold">Rajat</span> — developer and
              investor passionate about making financial planning accessible to every Indian.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Our Principles</h2>
          <ul className="space-y-2">
            {VALUES.map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm">
                <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">All Free Calculators</h2>
          <div className="space-y-3">
            {TOOLS.map(({ href, icon, name, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8E4DF] hover:border-[var(--color-accent)]/30 hover:bg-[rgba(27,58,92,0.08)] transition-all group"
              >
                <div className="bg-[rgba(27,58,92,0.15)] p-2 rounded-lg flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">{name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="glass-panel p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Get in Touch</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            For business enquiries, collaboration, feedback, or to report a bug:
          </p>
          <a
            href="mailto:businesswebsitestudio@gmail.com"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white hover:bg-[#112740] transition-all px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm"
          >
            <Mail className="w-4 h-4" />
            businesswebsitestudio@gmail.com
          </a>
          <div className="mt-4 pt-4 border-t border-[#E8E4DF]">
            <Link
              href="/us/disclaimer"
              className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[var(--color-accent)] text-xs transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Formula Methodology & Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
