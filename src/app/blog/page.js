"use client";
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Calculator, TrendingUp, Target, Layers } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const ARTICLES = [
  {
    href: '/blog/sip-to-reach-1-crore',
    tag: 'SIP Planning',
    tagColor: 'text-[#a78bfa] bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.25)]',
    title: 'How Much SIP to Reach ₹1 Crore in 10, 15 & 20 Years?',
    excerpt:
      'Get the exact monthly SIP amount you need at 10%, 12%, and 15% annual returns across different time horizons. Includes step-up SIP comparison showing how you can start with 44% less.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Calculator className="w-5 h-5 text-[#a78bfa]" />,
    highlight: '₹1 Crore Goal',
    highlightColor: 'text-[#a78bfa]',
  },
  {
    href: '/blog/cagr-vs-xirr-vs-absolute-return',
    tag: 'Return Metrics',
    tagColor: 'text-[#22C55E] bg-[rgba(34,197,94,0.10)] border-[rgba(34,197,94,0.25)]',
    title: 'CAGR vs XIRR vs Absolute Return — What\'s the Difference?',
    excerpt:
      'When Groww shows "XIRR" and a fund shows "CAGR", are they the same? No — and the confusion costs investors bad decisions. This guide explains each clearly with worked examples.',
    readTime: '5 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[#22C55E]" />,
    highlight: 'CAGR vs XIRR',
    highlightColor: 'text-[#22C55E]',
  },
];

const CALCULATORS = [
  { href: '/',                        icon: <Calculator className="w-4 h-4 text-[#a78bfa]" />, label: 'Step-Up SIP Calculator',  desc: 'SIP with step-up, lump sum & inflation' },
  { href: '/lumpsum-calculator',       icon: <Layers     className="w-4 h-4 text-yellow-400" />, label: 'Lumpsum Calculator',       desc: 'One-time investment future value'        },
  { href: '/target-amount-calculator', icon: <Target     className="w-4 h-4 text-blue-400"  />, label: 'SIP Goal Calculator',      desc: 'Time to reach ₹1 Crore'                 },
  { href: '/cagr-calculator',          icon: <TrendingUp className="w-4 h-4 text-green-400" />, label: 'CAGR Calculator',          desc: 'Compound annual growth rate'             },
];

export default function BlogIndexPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto space-y-8">

        <Breadcrumb items={[{ label: 'Guides' }]} />

        {/* Hero */}
        <div className="glass-panel p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="bg-[rgba(139,92,246,0.2)] border border-[#8b5cf6] p-3 rounded-2xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#a78bfa]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                Investment <span className="text-gradient">Guides</span>
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Free, jargon-free guides for Indian investors — SIP planning, CAGR explained, 
                how to reach ₹1 Crore, and more. Written by Rajat.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white px-1">All Guides</h2>
          {ARTICLES.map(({ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor }) => (
            <Link
              key={href}
              href={href}
              className="block glass-panel p-6 hover:bg-[rgba(139,92,246,0.06)] hover:border-[rgba(139,92,246,0.25)] border border-white/5 transition-all group rounded-2xl"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="bg-[rgba(255,255,255,0.05)] p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[rgba(139,92,246,0.15)] transition-colors">
                  {icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tag + read time */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColor}`}>
                      {tag}
                    </span>
                    <span className="text-gray-600 text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />{readTime}
                    </span>
                    <span className={`text-[10px] font-semibold ml-auto ${highlightColor}`}>{highlight}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-[#c4b5fd] transition-colors">
                    {title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                    {excerpt}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-[#a78bfa] text-xs font-semibold group-hover:gap-2.5 transition-all">
                    {cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-600 text-xs">Free Calculators</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Calculator cards */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3 px-1">Try Our Free Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CALCULATORS.map(({ href, icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(139,92,246,0.08)] hover:border-[rgba(139,92,246,0.2)] border border-white/5 transition-all group rounded-xl"
              >
                <div className="bg-[rgba(255,255,255,0.05)] p-2 rounded-lg flex-shrink-0 group-hover:bg-[rgba(139,92,246,0.15)] transition-colors">
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
