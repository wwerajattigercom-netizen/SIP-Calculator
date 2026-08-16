"use client";
import Link from 'next/link';
import { Menu, X, Moon, Sun, ChevronDown, Calculator, TrendingUp, Target, Layers, Wallet, BookOpen, Clock, AlertTriangle, GraduationCap, Home as HomeIcon } from 'lucide-react';
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
      newPath = newPath.replace(/dca/g, 'sip').replace(/million/g, 'crore');
      if (pathname === '/us/dca-calculator') newPath = '/';
      router.push(newPath);
    } else {
      document.cookie = "preferred_region=US; path=/; max-age=31536000";
      let newPath = `/us${pathname === '/' ? '/dca-calculator' : pathname}`;
      newPath = newPath.replace(/sip/g, 'dca').replace(/crore/g, 'million');
      if (pathname === '/goal-based-sip-calculator') newPath = '/us/goal-based-dca-calculator';
      router.push(newPath);
    }
  };

  const calculators = [
    { href: isUS ? '/us/dca-calculator' : '/', label: isUS ? 'DCA Calculator' : 'SIP Calculator', icon: Calculator },
    { href: isUS ? '/us/swp-calculator' : '/swp-calculator', label: 'SWP Calculator', icon: Wallet },
    { href: isUS ? '/us/cagr-calculator' : '/cagr-calculator', label: 'CAGR Calculator', icon: TrendingUp },
    { href: isUS ? '/us/target-amount-calculator' : '/target-amount-calculator', label: 'Goal Calculator', icon: Target },
    { href: isUS ? '/us/lumpsum-calculator' : '/lumpsum-calculator', label: 'Lumpsum Calculator', icon: Layers },
  ];

  const tools = [
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
        <Link href={isUS ? "/us/dca-calculator" : "/"} className="site-logo" aria-label="StepupCalculator Home">
          <span className="site-logo-text dark:text-[#E5E7EB]">
            StepupCalculator
          </span>
        </Link>

        {/* Right side — Desktop nav links and theme toggle */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors py-4">
                Calculators <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-[100%] -left-4 w-56 bg-white dark:bg-[#1B2431] border border-black/10 dark:border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 flex flex-col p-2">
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
              <button className="flex items-center gap-1 text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors py-4">
                Tools <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-[100%] -left-12 w-64 bg-white dark:bg-[#1B2431] border border-black/10 dark:border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 flex flex-col p-2 max-h-[80vh] overflow-y-auto hide-scrollbar">
                {tools.map((t) => (
                  <Link key={t.href} href={t.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(27,58,92,0.06)] dark:hover:bg-white/5 transition-colors group/link">
                    <t.icon className="w-4 h-4 text-[var(--color-accent)] group-hover/link:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/link:text-foreground line-clamp-1">{t.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href={isUS ? "/us/blog" : "/blog"} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors flex items-center gap-1">
              Guides
            </Link>
            
            <Link href={isUS ? "/us/about" : "/about"} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors">About</Link>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#1B2431] border-b border-black/10 shadow-xl flex flex-col py-3 px-4 gap-2 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          
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

          <Link href={isUS ? "/us/blog" : "/blog"} onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-base font-semibold block px-2 py-2 border-t border-black/5 dark:border-white/5 mt-1 pt-3">Guides & Articles</Link>
          <Link href={isUS ? "/us/about" : "/about"} onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-base font-semibold block px-2 py-2">About Us</Link>
        </div>
      )}
    </header>
  );
}
