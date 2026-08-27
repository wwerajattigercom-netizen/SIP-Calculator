"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Calculator, TrendingUp, Target, Layers, Wallet, Shield, BarChart3, Flame, GraduationCap, Home, Zap, Settings2, ArrowUpCircle, AlertTriangle, XCircle, Globe, PieChart } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const ARTICLES = [
  {
    href: '/us/blog/how-to-build-3-fund-portfolio',
    tag: 'Portfolio Strategy',
    tagColor: 'text-[#059669] bg-[#059669]/10 border-[#059669]/20',
    title: 'How to Build a Bogleheads 3-Fund Portfolio',
    excerpt: 'Simplify your retirement. Learn how to allocate Total US, Total International, and Total Bond funds based on your age and risk tolerance.',
    readTime: '9 min read',
    cta: 'Read Guide',
    icon: <PieChart className="w-5 h-5 text-[#059669]" />,
    highlight: 'Trending',
    highlightColor: 'text-[#059669]',
  },
  {
    href: '/us/blog/large-cap-vs-small-cap-funds',
    tag: 'Fund Selection',
    tagColor: 'text-[#1B3A5C] bg-[#1B3A5C]/10 border-[#1B3A5C]/20',
    title: 'Large Cap vs Small Cap Funds: Risk and Reward',
    excerpt: 'Compare the S&P 500 (Large Cap) with the Russell 2000 (Small Cap). Learn about the small-cap risk premium, historical drawdowns, and portfolio allocation.',
    readTime: '8 min read',
    cta: 'Read Guide',
    icon: <Layers className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'New',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/us/blog/capital-gains-tax-investments',
    tag: 'Tax Guide 2026',
    tagColor: 'text-[#991B1B] bg-[#991B1B]/10 border-[#991B1B]/20',
    title: 'Capital Gains Tax on Mutual Funds & ETFs',
    excerpt: 'Understand Short-Term vs Long-Term capital gains tax, the Net Investment Income Tax (NIIT), and how to use Tax-Loss Harvesting to reduce your IRS bill.',
    readTime: '8 min read',
    cta: 'Read Guide',
    icon: <Wallet className="w-5 h-5 text-[#991B1B]" />,
    highlight: 'Trending',
    highlightColor: 'text-[#991B1B]',
  },
  {
    href: '/us/blog/401k-vs-roth-ira-vs-traditional',
    tag: 'Retirement Savings',
    tagColor: 'text-[#059669] bg-[#059669]/10 border-[#059669]/20',
    title: '401(k) vs Roth IRA vs Traditional IRA: Which is Best?',
    excerpt: 'Compare contribution limits, employer matches, and pre-tax vs post-tax (tax-free growth) strategies to maximize your retirement accounts.',
    readTime: '7 min read',
    cta: 'Read Guide',
    icon: <Target className="w-5 h-5 text-[#059669]" />,
    highlight: 'New',
    highlightColor: 'text-[#059669]',
  },
  {
    href: '/us/blog/index-fund-vs-actively-managed',
    tag: 'Strategy Guide',
    tagColor: 'text-[#C4993C] bg-[#C4993C]/10 border-[#C4993C]/20',
    title: 'S&P 500 Index Funds vs Active Mutual Funds',
    excerpt: 'Why Warren Buffett made a $1 million bet on the S&P 500. Learn how the 1% fee drag of actively managed funds destroys your compounding returns.',
    readTime: '9 min read',
    cta: 'Read Guide',
    icon: <BarChart3 className="w-5 h-5 text-[#C4993C]" />,
    highlight: 'Deep Dive',
    highlightColor: 'text-[#C4993C]',
  },
  {
    href: '/us/blog/direct-vs-regular-plan',
    tag: 'Index Fund Guide',
    tagColor: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
    title: 'Low-Cost vs High-Fee Funds: The 1% That Costs You $165,000',
    excerpt: 'Both low-cost index funds and high-fee active funds invest in the market. But a 1% expense ratio difference will silently cost you $165,000+ over 30 years.',
    readTime: '7 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'New',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/blog/home-loan-with-low-credit-score',
    tag: 'Mortgage Planning',
    tagColor: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
    title: 'How to Get a Mortgage with a Low Credit Score',
    excerpt: 'Having a low FICO score doesn\'t mean you can\'t buy a home. Learn the exact strategies to secure a mortgage even with a score below 650.',
    readTime: '6 min read',
    cta: 'Read Guide',
    icon: <Home className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'New',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/blog/why-wealth-explodes-after-100k',
    tag: 'Wealth Building',
    tagColor: 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
    title: 'Why the First $100k is the Hardest (Charlie Munger\'s Wealth Secret)',
    excerpt: 'Charlie Munger famously said the first $100k is a b*tch. Discover the math behind why wealth explodes after $100k and how compounding takes over.',
    readTime: '5 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'Trending',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/blog/dca-vs-fd-ppf-rd',
    tag: 'Comparison Tool',
    tagColor: 'text-[#C4993C] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'DCA vs CD vs 401(k) Comparison Tool',
    excerpt:
      'Compare the wealth generated by Mutual Fund SIPs against traditional safe investments like 401(k) and Bank HYSAs. See exactly how much extra wealth you can generate.',
    readTime: '3 min read',
    cta: 'Try Tool',
    icon: <BarChart3 className="w-5 h-5 text-[#C4993C]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#C4993C]',
  },
  {
    href: '/us/tools/cost-of-delay-calculator',
    tag: 'Cost of Delay',
    tagColor: 'text-[var(--color-loss)] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: 'Cost of Delay Calculator — See What Waiting Costs You',
    excerpt:
      'Discover the devastating impact of delaying your DCA investments. See how much wealth you lose by waiting and find out exactly how much extra you\'ll need to invest to catch up.',
    readTime: '3 min read',
    cta: 'Try Calculator',
    icon: <Clock className="w-5 h-5 text-[var(--color-loss)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-loss)]',
  },
  {
    href: '/us/tools/dca-based-on-salary',
    tag: 'DCA Planning',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much DCA Should I Do Based on My Salary?',
    excerpt:
      'Use the 50-30-20 budgeting rule to find your ideal DCA amount. Interactive calculator shows Conservative (10%), Moderate (20%), and Aggressive (30%) plans with 20-year projections.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Wallet className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/tools/retirement-dca-calculator',
    tag: 'Retirement',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.1)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much DCA Do I Need to Retire?',
    excerpt:
      'Enter your age, expenses, and retirement target — get the exact monthly DCA needed. See the devastating cost of delaying by just 5 years.',
    readTime: '6 min read',
    cta: 'Try Calculator',
    icon: <Shield className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/tools/dca-vs-lumpsum',
    tag: 'Comparison',
    tagColor: 'text-[var(--color-returns)] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'DCA vs Lump Sum — Which Is Better? Interactive Comparison',
    excerpt:
      'Compare DCA and Lumpsum returns under Bull, Bear, and Volatile market scenarios. See which strategy wins — and by how much — with real-time charts.',
    readTime: '5 min read',
    cta: 'Compare Now',
    icon: <BarChart3 className="w-5 h-5 text-[var(--color-returns)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-returns)]',
  },
  {
    href: '/us/tools/dca-to-beat-inflation',
    tag: 'Inflation',
    tagColor: 'text-[var(--color-returns)] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'How Much DCA to Beat Inflation? Real vs Nominal Returns',
    excerpt:
      'See how inflation erodes your DCA returns. Dual-chart comparison of nominal vs real value, purchasing power erosion callout, and year-by-year breakdown.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Flame className="w-5 h-5 text-[var(--color-returns)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-returns)]',
  },
  {
    href: '/us/tools/dca-to-reach-1-million',
    tag: 'DCA Planning',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much DCA to Reach $1 Million in 10, 15 & 20 Years?',
    excerpt:
      'Get the exact monthly DCA amount you need at 10%, 12%, and 15% annual returns across different time horizons. Includes step-up DCA comparison showing how you can start with 44% less.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Calculator className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: '$1 Million Goal',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/tools/dca-for-child-education',
    tag: 'Goal Planning',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.10)] border-[rgba(27,58,92,0.25)]',
    title: 'DCA for Child Education — Education Goal Calculator',
    excerpt:
      'Education inflation runs at 10%+ per year. Find exactly how much DCA you need to fund your child\'s engineering, medical, or MBA degree — before the cost doubles.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <GraduationCap className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/tools/dca-for-house-down-payment',
    tag: 'Goal Planning',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.10)] border-[rgba(27,58,92,0.25)]',
    title: 'DCA for House Down Payment — Save for Your Dream Home',
    excerpt:
      'Property prices rise 7%+ annually. See the future cost of that $1,000,000 house, the down payment you need to save, and the exact monthly DCA to get there — with city-wise reference.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Home className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[var(--color-accent)]',
  },
  {
    href: '/us/tools/dca-during-market-crash',
    tag: 'Market Strategy',
    tagColor: 'text-[var(--color-loss)] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: 'DCA During Market Crash — Should You Stop or Continue?',
    excerpt:
      'Interactive crash simulator. See exactly how much wealth you lose by pausing DCA during a 40% market fall — and why rupee-cost averaging makes crashes the best time to invest.',
    readTime: '6 min read',
    cta: 'Run Simulation',
    icon: <Zap className="w-5 h-5 text-[var(--color-loss)]" />,
    highlight: 'Simulator',
    highlightColor: 'text-[var(--color-loss)]',
  },
  {
    href: '/us/blog/cagr-vs-xirr-vs-absolute-return',
    tag: 'Return Metrics',
    tagColor: 'text-[#C4993C] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'CAGR vs XIRR vs Absolute Return — What\'s the Difference?',
    excerpt:
      'When Groww shows "XIRR" and a fund shows "CAGR", are they the same? No — and the confusion costs investors bad decisions. This guide explains each clearly with worked examples.',
    readTime: '5 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />,
    highlight: 'CAGR vs XIRR',
    highlightColor: 'text-[#C4993C]',
  },
  {
    href: '/us/blog/swp-vs-dca',
    tag: 'Retirement Strategy',
    tagColor: 'text-[var(--color-returns)] bg-[rgba(5,150,105,0.1)] border-[rgba(5,150,105,0.25)]',
    title: 'SWP vs DCA: What\'s the Difference & Who Should Use Each?',
    excerpt: 'DCA builds your wealth over time, SWP pays you a monthly salary when you retire. Understand the core differences and tax advantages.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Wallet className="w-5 h-5 text-[var(--color-returns)]" />,
    highlight: 'Trending',
    highlightColor: 'text-[var(--color-returns)]',
  },
  {
    href: '/us/blog/dca-vs-stp',
    tag: 'Lump Sum Strategy',
    tagColor: 'text-[#C4993C] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'DCA vs STP: How to Invest a Lump Sum Safely',
    excerpt: 'Got a huge bonus or sold a property? Learn how to use a Systematic Transfer Plan (STP) to avoid market timing risks.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[#C4993C]" />,
  },
  {
    href: '/us/blog/flexi-dca',
    tag: 'Advanced DCA',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'What is a Flexi DCA? (And Who Should Use It)',
    excerpt: 'Freelancer with irregular income? Learn how Flexi DCAs allow you to change your monthly investment amount without breaking discipline.',
    readTime: '3 min read',
    cta: 'Read Guide',
    icon: <Settings2 className="w-5 h-5 text-[var(--color-accent)]" />,
  },
  {
    href: '/us/blog/step-up-dca',
    tag: 'Wealth Multiplier',
    tagColor: 'text-[var(--color-returns)] bg-[rgba(5,150,105,0.1)] border-[rgba(5,150,105,0.25)]',
    title: 'Step-Up DCA: The Secret to Retiring Early',
    excerpt: 'Also known as a Top-Up DCA, learn how increasing your DCA by just 10% every year can double your final retirement corpus.',
    readTime: '3 min read',
    cta: 'Read Guide',
    icon: <ArrowUpCircle className="w-5 h-5 text-[var(--color-returns)]" />,
  },
  {
    href: '/us/blog/trigger-dca',
    tag: 'Tactical Strategy',
    tagColor: 'text-[var(--color-loss)] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: 'Trigger DCA: How to Automatically Buy the Dip',
    excerpt: 'Want to invest more money only when the stock market crashes? A Trigger DCA allows you to set rules for when your money gets invested.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Zap className="w-5 h-5 text-[var(--color-loss)]" />,
  },
  {
    href: '/us/blog/dynamic-dca',
    tag: 'Smart Investing',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'Dynamic DCA (Market-Linked DCA)',
    excerpt: 'Dynamic DCA takes the emotion out of investing by using algorithms to decide exactly how much you should invest this month based on valuations.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />,
  },
  {
    href: '/us/blog/common-dca-mistakes',
    tag: 'Mistakes to Avoid',
    tagColor: 'text-[var(--color-loss)] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: '7 Common DCA Mistakes to Avoid',
    excerpt: 'Are you unknowingly destroying your long-term wealth? Avoid these frequent DCA mistakes like pausing during a crash.',
    readTime: '5 min read',
    cta: 'Read Guide',
    icon: <AlertTriangle className="w-5 h-5 text-[var(--color-loss)]" />,
    highlight: 'Must Read',
    highlightColor: 'text-[var(--color-loss)]',
  },
  {
    href: '/us/blog/types-of-dca',
    tag: 'Beginner Guide',
    tagColor: 'text-[#C4993C] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: '5 Types of DCAs Explained: Regular, Flexi, Perpetual',
    excerpt: 'Not all DCAs are created equal. Depending on your income stability and strategy, choose a DCA that fits your unique needs.',
    readTime: '3 min read',
    cta: 'Read Guide',
    icon: <Layers className="w-5 h-5 text-[#C4993C]" />,
  },
  {
    href: '/us/blog/dca-for-expats',
    tag: 'Expat Guide',
    tagColor: 'text-[var(--color-accent)] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'DCA for Expats: A Complete Investing Guide',
    excerpt: 'Can expats invest globally? Learn about international accounts, taxation, and how to safely navigate cross-border investing.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Globe className="w-5 h-5 text-[var(--color-accent)]" />,
  },
  {
    href: '/us/blog/dca-vs-ulip',
    tag: 'Insurance vs Investment',
    tagColor: 'text-[var(--color-returns)] bg-[rgba(5,150,105,0.1)] border-[rgba(5,150,105,0.25)]',
    title: 'DCA vs Universal Life Insurance: Why Mutual Funds Win',
    excerpt: 'Never mix insurance and investment. See why pure mutual fund DCAs easily beat Life Insurance products over the long term.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Shield className="w-5 h-5 text-[var(--color-returns)]" />,
  },
];

const CALCULATORS = [
  { href: '/us/dca-calculator',                        icon: <Calculator className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Step-Up DCA Calculator',  desc: 'DCA with step-up, lump sum & inflation' },
  { href: '/us/lumpsum-calculator',       icon: <Layers     className="w-4 h-4 text-[var(--color-returns)]" />, label: 'Lumpsum Calculator',       desc: 'One-time investment future value'        },
  { href: '/us/target-amount-calculator', icon: <Target     className="w-4 h-4 text-[var(--color-accent)]"  />, label: 'DCA Goal Calculator',      desc: 'Time to reach $1 Million'                 },
  { href: '/us/cagr-calculator',          icon: <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />, label: 'CAGR Calculator',          desc: 'Compound annual growth rate'             },
  { href: '/us/swp-calculator',           icon: <Wallet     className="w-4 h-4 text-[var(--color-accent)]" />, label: 'SWP Calculator',           desc: 'Monthly withdrawal planning'             },
  { href: '/us/tools/cost-of-delay-calculator', icon: <Clock      className="w-4 h-4 text-[var(--color-loss)]" />, label: 'Cost of Delay Calculator', desc: 'See what waiting costs you'              },
  { href: '/us/tools/savings-vs-dca-calculator', icon: <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Savings vs DCA Calculator', desc: 'Compare Savings Account with DCA' },
  { href: '/us/tools/fire-calculator', icon: <Target className="w-4 h-4 text-[var(--color-accent)]" />, label: 'FIRE Calculator', desc: 'Early retirement planner' },
  { href: '/us/tools/xirr-calculator', icon: <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />, label: 'XIRR Calculator', desc: 'Calculate investment XIRR' },
  { href: '/us/tools/retirement-account-calculator', icon: <Wallet className="w-4 h-4 text-[var(--color-returns)]" />, label: '401k/IRA Calculator', desc: 'Retirement Account planner' },
  { href: '/us/tools/roth-ira-calculator', icon: <Wallet className="w-4 h-4 text-[#C4993C]" />, label: 'Roth IRA Calculator', desc: 'Roth IRA returns' },
  { href: '/us/tools/buy-vs-rent-calculator', icon: <Home className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Buy vs Rent Calculator', desc: 'Real estate vs investing comparison' }
];


const TOOL_HREFS = [
  '/us/blog/dca-vs-fd-ppf-rd',
  '/us/tools/cost-of-delay-calculator',
  '/us/tools/dca-based-on-salary',
  '/us/tools/retirement-dca-calculator',
  '/us/tools/dca-vs-lumpsum',
  '/us/tools/dca-to-beat-inflation',
  '/us/tools/dca-during-market-crash',
  '/us/tools/dca-to-reach-1-million',
  '/us/tools/dca-for-child-education',
  '/us/tools/dca-for-house-down-payment'
];

export default function BlogIndexPage() {
  const tools = ARTICLES.filter(a => TOOL_HREFS.includes(a.href));
  const guides = ARTICLES.filter(a => !TOOL_HREFS.includes(a.href));
  
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto space-y-8">

        <CalculatorTabs />
        <Breadcrumb items={[{ label: 'Guides' }]} />

        {/* Hero */}
        <div className="glass-panel p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="bg-[rgba(27,58,92,0.2)] border border-[var(--color-accent)] p-3 rounded-2xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                Investment Guides 
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xl">
                Free, jargon-free guides with interactive calculators for Global investors — DCA planning,
                retirement, inflation, market scenarios, and more. Written by Rajat.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-foreground px-1 mb-4">All Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {ARTICLES.map(({ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor }, index) => (
              <Link
                key={href}
                href={href}
                className="block glass-panel p-5 hover:bg-[rgba(27,58,92,0.02)] hover:border-[rgba(27,58,92,0.25)] border border-[#E8E4DF] transition-all group rounded-2xl h-full relative overflow-hidden"
              >
                {/* Corner Number Badge */}
                <div className="absolute top-0 left-0 bg-[var(--color-accent)] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl z-20 shadow-sm">
                  #{index + 1}
                </div>
                
                <div className="flex flex-col h-full items-start gap-4 relative z-10 pt-1">
                  {/* Icon & Meta */}
                  <div className="flex w-full items-start justify-between">
                    <div className="bg-[rgba(0,0,0,0.03)] p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[rgba(27,58,92,0.1)] transition-colors">
                      {icon}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColor}`}>
                        {tag}
                      </span>
                      {highlight && (
                        <span className={`text-[10px] font-semibold ${highlightColor}`}>{highlight}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col w-full min-w-0">
                    <div className="flex items-center gap-1 mb-2 text-gray-500 dark:text-gray-400 text-[10px]">
                      <Clock className="w-3 h-3" />{readTime}
                    </div>

                    {/* Title */}
                    <h2 className="text-foreground font-bold text-base leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {excerpt}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-xs font-semibold group-hover:gap-2.5 transition-all">
                        {cta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-gray-600 dark:text-gray-400 text-xs">Free Calculators</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        {/* Calculator cards */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 px-1">Try Our Free Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CALCULATORS.map(({ href, icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.08)] hover:border-[rgba(27,58,92,0.2)] border border-[#E8E4DF] transition-all group rounded-xl"
              >
                <div className="bg-[rgba(0,0,0,0.03)] p-2 rounded-lg flex-shrink-0 group-hover:bg-[rgba(27,58,92,0.15)] transition-colors">
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">{label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
