"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Target, TrendingUp, Layers, Wallet, BookOpen, Clock, BarChart3, AlertTriangle, Shield, ExternalLink, Mail } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';

export default function Footer() {
  const pathname = usePathname() || '/';
  const { isUS, terms } = useRegion();

  const primaryLabel = isUS ? 'DCA' : 'SIP';

  const footerData = [
    {
      title: "Core Calculators",
      links: [
        { href: isUS ? '/us/dca-calculator' : '/', label: `${primaryLabel} Calculator`, icon: Calculator },
        { href: isUS ? '/us/swp-calculator' : '/swp-calculator', label: 'SWP Calculator', icon: Wallet },
        { href: isUS ? '/us/cagr-calculator' : '/cagr-calculator', label: 'CAGR Calculator', icon: TrendingUp },
        { href: isUS ? '/us/target-amount-calculator' : '/target-amount-calculator', label: 'Goal Calculator', icon: Target },
        { href: isUS ? '/us/lumpsum-calculator' : '/lumpsum-calculator', label: 'Lumpsum Calculator', icon: Layers },
      ]
    },
    {
      title: "Interactive Tools",
      links: [
        { href: isUS ? '/us/tools/cost-of-delay-calculator' : '/tools/cost-of-delay-calculator', label: 'Cost of Delay Calculator', icon: Clock },
        { href: isUS ? '/us/tools/retirement-dca-calculator' : '/tools/retirement-sip-calculator', label: `Retirement ${primaryLabel} Calculator`, icon: Shield },
        { href: isUS ? '/us/tools/dca-vs-lumpsum' : '/tools/sip-vs-lumpsum', label: `${primaryLabel} vs Lumpsum Simulator`, icon: BarChart3 },
      ]
    },
    {
      title: "Popular Guides",
      links: [
        { href: isUS ? '/us/blog/types-of-dca' : '/blog/types-of-sip', label: `5 Types of ${primaryLabel}s`, icon: BookOpen },
        { href: isUS ? '/us/blog/common-dca-mistakes' : '/blog/common-sip-mistakes', label: `7 Common ${primaryLabel} Mistakes`, icon: AlertTriangle },
        { href: isUS ? '/us/blog/swp-vs-dca' : '/blog/swp-vs-sip', label: `SWP vs ${primaryLabel}`, icon: BookOpen },
        { href: isUS ? '/us/blog' : '/blog', label: "View All Guides", icon: ExternalLink },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#1B3A5C] text-white pt-16 pb-8 border-t border-[#112740] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href={isUS ? "/us/dca-calculator" : "/"} className="inline-block">
              <span className="text-xl font-extrabold text-white tracking-tight">StepupCalculator</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed pr-4">
              Free, transparent, and highly accurate financial calculators. We help you plan your investments and build wealth without jargon or sign-ups.
            </p>
            <a href="mailto:businesswebsitestudio@gmail.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm mt-2">
              <Mail className="w-4 h-4 opacity-70" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Dynamic Columns */}
          {footerData.map((col, i) => (
            <div key={i}>
              <h3 className="text-white font-extrabold mb-4 text-sm tracking-widest uppercase">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="group flex items-start gap-2 text-white/80 hover:text-white transition-colors text-sm">
                      <link.icon className="w-4 h-4 mt-0.5 opacity-70 group-hover:opacity-100 group-hover:text-[#C4993C] transition-all" />
                      <span className="leading-snug">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© {new Date().getFullYear()} StepupCalculator. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={isUS ? "/us/about" : "/about"} className="hover:text-white transition-colors">About Us</Link>
            <Link href={isUS ? "/us/disclaimer" : "/disclaimer"} className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
