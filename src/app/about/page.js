"use client";
import Link from 'next/link';
import { TrendingUp, Calculator, Target, Mail, ExternalLink, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const TOOLS = [
  {
    href: '/',
    icon: <Calculator className="w-5 h-5 text-[var(--color-accent)]" />,
    name: 'SIP Calculator with Step-Up & Inflation',
    desc: 'Monthly SIP with annual step-up, lump sum, inflation adjustment, and ₹1 Crore milestone tracker.',
  },
  {
    href: '/target-amount-calculator',
    icon: <Target className="w-5 h-5 text-[var(--color-accent)]" />,
    name: 'SIP Goal / Time-to-Target Calculator',
    desc: 'Set your target corpus (e.g., ₹1 Crore) and find how long your SIP will take — or what SIP amount you need.',
  },
  {
    href: '/cagr-calculator',
    icon: <TrendingUp className="w-5 h-5 text-[#0D9488]" />,
    name: 'CAGR Calculator',
    desc: 'Compound Annual Growth Rate calculator for lump sum investments and SIP+lumpsum portfolios. Includes Rule of 72.',
  },
  {
    href: '/lumpsum-calculator',
    icon: <Calculator className="w-5 h-5 text-[var(--color-returns)]" />,
    name: 'Lumpsum Calculator',
    desc: 'Calculate future value of a one-time lump sum investment at a given annual return rate.',
  },
];

const VALUES = [
  'No sign-up, no login, no email required',
  'Zero ads — clean, distraction-free interface',
  'Formula methodology is transparent and documented',
  'Follows SEBI/AMFI standard APR convention for Indian SIP',
  'Real-time calculation — results update as you slide',
  'Works on mobile, tablet and desktop at any zoom level',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://stepupcalculator.com/#organization',
      name: 'StepupCalculator',
      url: 'https://stepupcalculator.com',
      description: 'Free, accurate, and beautifully designed financial calculators built specifically for Indian investors.'
    },
    {
      '@type': 'Person',
      '@id': 'https://stepupcalculator.com/#author',
      name: 'Rajat',
      jobTitle: 'Software Developer & Personal Finance Expert',
      url: 'https://stepupcalculator.com/about',
      description: 'Software developer and personal finance enthusiast dedicated to building transparent, accurate financial tools for everyday investors.'
    }
  ]
};

export default function AboutPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            Most SIP calculators online are either too basic (no sign of step-up or inflation tracking) or buried
            inside apps that require sign-up. I wanted a single, fast, honest tool that shows the
            real numbers — including how inflation erodes your returns and how a small annual
            step-up dramatically changes your final corpus over decades.
          </p>
          <div className="pt-4 border-t border-[#E8E4DF] mt-6">
            <h3 className="text-lg font-bold text-foreground mb-2">About the Creator</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Built by <strong className="text-foreground">Rajat</strong> — a professional software developer and passionate personal finance advocate. Frustrated by the lack of transparent, accurate financial tools available to retail investors, Rajat combined his technical expertise with rigorous financial mathematics to build StepupCalculator. The goal? To make institutional-grade financial planning accessible to every Indian, completely free of charge.
            </p>
          </div>
        </div>

        {/* Editorial Standards */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Our Editorial & Accuracy Standards</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-4">
            We hold ourselves to the highest standards of mathematical accuracy and transparency. When dealing with your money and your life&apos;s savings, &quot;close enough&quot; is not acceptable.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
              <span><strong>SEBI/AMFI Compliant:</strong> The formulas used for our SIP calculations strictly follow the SEBI/AMFI standard — utilizing APR-based monthly compounding with the SIP invested at the beginning of each month. This perfectly aligns with how Indian mutual fund industry projections are officially calculated.</span>
            </li>
            <li className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
              <span><strong>Transparent Methodology:</strong> We do not hide our math behind proprietary black boxes. Our formulas are openly documented and verifiable.</span>
            </li>
            <li className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
              <span><strong>No Conflicts of Interest:</strong> StepupCalculator is independently funded. We do not sell your email, we do not require sign-ups, and our calculator results are never artificially inflated to sell you financial products.</span>
            </li>
          </ul>
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
                className="flex items-start gap-3 p-4 rounded-xl bg-[var(--panel-bg)] border border-[#E8E4DF] hover:border-[var(--color-accent)]/30 hover:bg-[rgba(27,58,92,0.08)] transition-all group"
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
              href="/disclaimer"
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
