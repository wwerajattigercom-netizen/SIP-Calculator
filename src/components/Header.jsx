"use client";
import Link from 'next/link';
import { Menu, X, Moon, Sun, ChevronDown, Calculator, TrendingUp, Target, Layers, Wallet, BookOpen, Clock, AlertTriangle, GraduationCap, Home as HomeIcon, Car, Landmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function Header() {
 const [isOpen, setIsOpen] = useState(false);
 const { theme, setTheme, systemTheme } = useTheme();
 const [mounted, setMounted] = useState(false);
 const pathname = usePathname() || '/';
 const router = useRouter();
 
 const isUS = pathname.startsWith('/us');

 useEffect(() => {
  setMounted(true);
 }, []);

 const currentTheme = theme === 'system' ? systemTheme : theme;

 const toggleTheme = () => {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
 };

 const toggleRegion = () => {
  if (isUS) {
   document.cookie = "preferred_region=IN; path=/; max-age=31536000";
   let newPath = pathname.replace(/^\/us(\/|$)/, '/');
   newPath = newPath.replace(/dca/g, 'sip').replace(/million/g, 'crore').replace(/expats/g, 'nris');
   if (pathname === '/us/dca-calculator') newPath = '/';
   // Specific tool mappings (US to IN)
   if (pathname === '/us/tools/retirement-account-calculator') newPath = '/tools/nps-calculator';
   if (pathname === '/us/tools/roth-ira-calculator') newPath = '/tools/ppf-calculator';
   if (pathname === '/us/tools/savings-vs-dca-calculator') newPath = '/tools/fd-vs-sip-calculator';
   if (pathname === '/us/tools/mortgage-calculator') newPath = '/tools/home-loan-calculator';
   if (pathname === '/us/tools/auto-loan-calculator') newPath = '/tools/car-loan-calculator';
   if (pathname === '/us/blog/why-wealth-explodes-after-100k') newPath = '/blog/why-net-worth-explodes-after-1-crore';
   if (pathname === '/us/blog/home-loan-with-low-credit-score') newPath = '/blog/home-loan-with-low-cibil-score';
   if (pathname === '/us/blog/direct-vs-regular-plan') newPath = '/blog/direct-vs-regular-mutual-fund';
   if (pathname === '/us/blog/index-fund-vs-actively-managed') newPath = '/blog/index-fund-vs-active-fund';
   if (pathname === '/us/blog/capital-gains-tax-investments') newPath = '/blog/mutual-fund-taxation-guide';
   if (pathname === '/us/blog/401k-vs-roth-ira-vs-traditional') newPath = '/blog/elss-vs-ppf-vs-nps';
   if (pathname === '/us/blog/large-cap-vs-small-cap-funds') newPath = '/blog/large-cap-vs-mid-cap-vs-small-cap';
   if (pathname === '/us/blog/how-to-build-3-fund-portfolio') newPath = '/blog/how-to-build-mutual-fund-portfolio';
   if (pathname === '/us/blog/what-is-expense-ratio') newPath = '/blog/what-is-expense-ratio';
   if (pathname === '/us/blog/when-to-sell-mutual-fund') newPath = '/blog/when-to-exit-mutual-fund';
   if (pathname === '/us/blog/ai-trading-bots-vs-dca') newPath = '/blog/ai-trading-bots-vs-sip';
   router.push(newPath);
  } else {
   document.cookie = "preferred_region=US; path=/; max-age=31536000";
   let newPath = `/us${pathname === '/' ? '/dca-calculator' : pathname}`;
   newPath = newPath.replace(/sip/g, 'dca').replace(/crore/g, 'million').replace(/nris/g, 'expats');
   if (pathname === '/goal-based-sip-calculator') newPath = '/us/goal-based-dca-calculator';
   // Specific tool mappings (IN to US)
   if (pathname === '/tools/nps-calculator') newPath = '/us/tools/retirement-account-calculator';
   if (pathname === '/tools/ppf-calculator') newPath = '/us/tools/roth-ira-calculator';
   if (pathname === '/tools/fd-vs-sip-calculator') newPath = '/us/tools/savings-vs-dca-calculator';
   if (pathname === '/tools/home-loan-calculator') newPath = '/us/tools/mortgage-calculator';
   if (pathname === '/tools/car-loan-calculator') newPath = '/us/tools/auto-loan-calculator';
   if (pathname === '/blog/why-net-worth-explodes-after-1-crore') newPath = '/us/blog/why-wealth-explodes-after-100k';
   if (pathname === '/blog/home-loan-with-low-cibil-score') newPath = '/us/blog/home-loan-with-low-credit-score';
   if (pathname === '/blog/direct-vs-regular-mutual-fund') newPath = '/us/blog/direct-vs-regular-plan';
   if (pathname === '/blog/index-fund-vs-active-fund') newPath = '/us/blog/index-fund-vs-actively-managed';
   if (pathname === '/blog/mutual-fund-taxation-guide') newPath = '/us/blog/capital-gains-tax-investments';
   if (pathname === '/blog/elss-vs-ppf-vs-nps') newPath = '/us/blog/401k-vs-roth-ira-vs-traditional';
   if (pathname === '/blog/large-cap-vs-mid-cap-vs-small-cap') newPath = '/us/blog/large-cap-vs-small-cap-funds';
   if (pathname === '/blog/how-to-build-mutual-fund-portfolio') newPath = '/us/blog/how-to-build-3-fund-portfolio';
   if (pathname === '/blog/what-is-expense-ratio') newPath = '/us/blog/what-is-expense-ratio';
   if (pathname === '/blog/when-to-exit-mutual-fund') newPath = '/us/blog/when-to-sell-mutual-fund';
   if (pathname === '/blog/ai-trading-bots-vs-sip') newPath = '/us/blog/ai-trading-bots-vs-dca';
   router.push(newPath);
  }
 };

  const calculators = [
   { href: isUS ? '/us/dca-calculator' : '/', label: isUS ? 'DCA Calculator' : 'SIP Calculator', icon: Calculator },
   { href: isUS ? '/us/tools/emi-calculator' : '/tools/emi-calculator', label: 'EMI Calculator', icon: Calculator },
   { href: isUS ? '/us/tools/mortgage-calculator' : '/tools/home-loan-calculator', label: isUS ? 'Mortgage Calculator' : 'Home Loan EMI', icon: HomeIcon },
   { href: isUS ? '/us/tools/auto-loan-calculator' : '/tools/car-loan-calculator', label: isUS ? 'Auto Loan Calculator' : 'Car Loan EMI', icon: Car },
   { href: isUS ? '/us/tools/income-tax-calculator' : '/tools/income-tax-calculator', label: isUS ? 'Income Tax Calc' : 'Tax Regime Calc', icon: Wallet },
   { href: isUS ? '/us/swp-calculator' : '/swp-calculator', label: 'SWP Calculator', icon: Wallet },
   { href: isUS ? '/us/cagr-calculator' : '/cagr-calculator', label: 'CAGR Calculator', icon: TrendingUp },
   { href: isUS ? '/us/target-amount-calculator' : '/target-amount-calculator', label: 'Goal Calculator', icon: Target },
   { href: isUS ? '/us/lumpsum-calculator' : '/lumpsum-calculator', label: 'Lumpsum Calculator', icon: Layers },
   { href: isUS ? '/us/tools/savings-vs-dca-calculator' : '/tools/fd-vs-sip-calculator', label: isUS ? 'Savings vs DCA' : 'FD vs SIP', icon: TrendingUp },
   { href: isUS ? '/us/tools/fire-calculator' : '/tools/fire-calculator', label: 'FIRE Calculator', icon: Target },
   { href: isUS ? '/us/tools/xirr-calculator' : '/tools/xirr-calculator', label: 'XIRR Calculator', icon: TrendingUp },
   { href: isUS ? '/us/tools/retirement-account-calculator' : '/tools/nps-calculator', label: isUS ? '401k/IRA Calculator' : 'NPS Calculator', icon: Wallet },
   { href: isUS ? '/us/tools/roth-ira-calculator' : '/tools/ppf-calculator', label: isUS ? 'Roth IRA Calculator' : 'PPF Calculator', icon: Wallet },
   { href: isUS ? '/us/tools/buy-vs-rent-calculator' : '/tools/buy-vs-rent-calculator', label: 'Buy vs Rent', icon: HomeIcon },
  ];

 const tools = [
  { href: isUS ? '/us/tools/goal-planner' : '/tools/goal-planner', label: 'Goal Planner Hub', icon: Target },
  { href: isUS ? '/us/tools/net-worth-calculator' : '/tools/net-worth-calculator', label: 'Net Worth Tracker', icon: Landmark },
  { href: isUS ? '/us/tools/cost-of-delay-calculator' : '/tools/cost-of-delay-calculator', label: 'Cost of Delay', icon: Clock },
  { href: isUS ? '/us/tools/dca-based-on-salary' : '/tools/sip-based-on-salary', label: '50-30-20 Rule Planner', icon: Wallet },
  { href: isUS ? '/us/tools/retirement-dca-calculator' : '/tools/retirement-sip-calculator', label: 'Retirement Planner', icon: Target },
  { href: isUS ? '/us/tools/dca-vs-lumpsum' : '/tools/sip-vs-lumpsum', label: isUS ? 'DCA vs Lumpsum' : 'SIP vs Lumpsum', icon: TrendingUp },
  { href: isUS ? '/us/tools/dca-to-beat-inflation' : '/tools/sip-to-beat-inflation', label: 'Inflation Impact', icon: AlertTriangle },
  { href: isUS ? '/us/tools/dca-for-child-education' : '/tools/sip-for-child-education', label: 'Child Education Planner', icon: GraduationCap },
  { href: isUS ? '/us/tools/dca-for-house-down-payment' : '/tools/sip-for-house-down-payment', label: 'House Down Payment', icon: HomeIcon },
  { href: isUS ? '/us/tools/dca-during-market-crash' : '/tools/sip-during-market-crash', label: 'Market Crash Impact', icon: TrendingUp },
  { href: isUS ? '/us/tools/dca-to-reach-1-million' : '/tools/sip-to-reach-1-crore', label: isUS ? 'Reach $1 Million Goal' : 'Reach ₹1 Crore Goal', icon: Target },
 ];

 return (
  <header className="site-header relative z-[100] dark:bg-background dark:border-b dark:border-white/10">
   <div className="site-header-inner flex justify-between items-center w-full">
    <Link href={isUS ? "/us/dca-calculator" : "/"} className="site-logo flex items-center gap-2" aria-label="StepupCalculator Home">
     <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1B3A5C' }}>
      <svg
       width="20"
       height="20"
       viewBox="0 0 24 24"
       fill="none"
       stroke="#C4993C"
       strokeWidth="3.5"
       strokeLinecap="round"
       strokeLinejoin="round"
      >
       <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
       <polyline points="16 7 22 7 22 13" />
      </svg>
     </div>
     <span className="site-logo-text dark:text-[#E5E7EB]">
      StepupCalculator
     </span>
    </Link>

    {/* Right side — Desktop nav links and theme toggle */}
    <div className="flex items-center gap-4">
     <nav className="hidden md:flex items-center gap-5 lg:gap-6">
      
      {/* Calculators Dropdown */}
      <div className="relative group">
       <button className="flex items-center gap-1 text-foreground hover:text-[var(--color-accent)] text-sm font-semibold transition-colors py-4">
        Calculators <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
       </button>
       <div className="absolute top-[100%] -left-4 w-56 bg-[var(--panel-bg)] dark:bg-[#1B2431] border border-black/10 dark:border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 flex flex-col p-2">
        {calculators.map((calc) => (
         <Link key={calc.href} href={calc.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(27,58,92,0.06)] dark:hover:bg-white/5 transition-colors group/link">
          <calc.icon className="w-4 h-4 text-[var(--color-accent)] group-hover/link:scale-110 transition-transform" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/link:text-foreground">{calc.label}</span>
         </Link>
        ))}
       </div>
      </div>

      {/* Interactive Tools Dropdown */}
      <div className="relative group">
       <button className="flex items-center gap-1 text-foreground hover:text-[var(--color-accent)] text-sm font-semibold transition-colors py-4">
        Tools <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
       </button>
       <div className="absolute top-[100%] -left-12 w-64 bg-[var(--panel-bg)] dark:bg-[#1B2431] border border-black/10 dark:border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 flex flex-col p-2 max-h-[80vh] overflow-y-auto hide-scrollbar">
        {tools.map((t) => (
         <Link key={t.href} href={t.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(27,58,92,0.06)] dark:hover:bg-white/5 transition-colors group/link">
          <t.icon className="w-4 h-4 text-[var(--color-accent)] group-hover/link:scale-110 transition-transform flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/link:text-foreground line-clamp-1">{t.label}</span>
         </Link>
        ))}
       </div>
      </div>

      <Link href={isUS ? "/us/blog" : "/blog"} className="text-foreground hover:text-[var(--color-accent)] text-sm font-semibold transition-colors flex items-center gap-1">
       Guides
      </Link>
      
      <Link href={isUS ? "/us/about" : "/about"} className="text-foreground hover:text-[var(--color-accent)] text-sm font-semibold transition-colors">About</Link>
     </nav>
     
     <button
      onClick={toggleRegion}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-black/10 dark:border-white/10 text-xs font-semibold text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-2"
      aria-label="Toggle Region"
     >
      <Globe className="w-4 h-4 text-[var(--color-accent)]" />
      {isUS ? 'US' : 'IN'}
     </button>
     
     {mounted && (
      <button
       onClick={toggleTheme}
       className="p-1.5 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
       aria-label="Toggle Theme"
      >
       {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
       ) : (
        <Moon className="w-5 h-5 text-slate-700" />
       )}
      </button>
     )}

     {/* Mobile Menu Toggle */}
     <button 
      className="md:hidden p-1 text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors" 
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle Menu"
     >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
     </button>
    </div>
   </div>

   {/* Mobile Nav Dropdown */}
   {isOpen && (
    <div className="md:hidden absolute top-full left-0 w-full bg-[var(--panel-bg)] dark:bg-[#1B2431] border-b border-black/10 shadow-xl flex flex-col py-3 px-4 gap-2 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
     
     <div className="px-2 py-1">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2 block">Calculators</span>
      <div className="flex flex-col gap-1 pl-2 border-l-2 border-black/5 dark:border-white/5">
       {calculators.map((calc) => (
        <Link key={calc.href} href={calc.href} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-foreground text-sm font-medium py-1.5 flex items-center gap-2">
         <calc.icon className="w-3.5 h-3.5" />
         {calc.label}
        </Link>
       ))}
      </div>
     </div>

     <div className="px-2 py-1 mt-1">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2 block">Interactive Tools</span>
      <div className="flex flex-col gap-1 pl-2 border-l-2 border-black/5 dark:border-white/5">
       {tools.map((t) => (
        <Link key={t.href} href={t.href} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-foreground text-sm font-medium py-1.5 flex items-center gap-2">
         <t.icon className="w-3.5 h-3.5 flex-shrink-0" />
         <span className="line-clamp-1">{t.label}</span>
        </Link>
       ))}
      </div>
     </div>

     <Link href={isUS ? "/us/blog" : "/blog"} onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] text-base font-semibold block px-2 py-2 border-t border-black/5 dark:border-white/5 mt-1 pt-3">Guides & Articles</Link>
     <Link href={isUS ? "/us/about" : "/about"} onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] text-base font-semibold block px-2 py-2">About Us</Link>
    </div>
   )}
  </header>
 );
}
