import Link from 'next/link';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, Zap, Clock, ShieldCheck, ArrowUpCircle, PlusCircle, Lightbulb } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Why the First $100k is the Hardest (Charlie Munger's Wealth Secret)",
  description: "Charlie Munger famously said the first $100k is a b*tch. Discover the math behind why wealth explodes after $100k and how compounding takes over.",
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/why-wealth-explodes-after-100k',
  }
};

const STAGES = [
  {
    target: '$0 to $100k',
    time: '7.5 Years',
    driver: 'Your Savings & Discipline',
    effort: 'The Grind Phase. You are pushing a heavy snowball uphill.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    target: '$100k to $200k',
    time: '3.5 Years',
    driver: '50% Savings, 50% Compounding',
    effort: 'The Momentum Phase. The snowball is moving itself.',
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    target: '$200k to $300k',
    time: '2.5 Years',
    driver: 'Mostly Compounding',
    effort: 'The Explosion Phase. Your money earns more than you do.',
    icon: Zap,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-[var(--color-accent)]/10'
  },
  {
    target: '$300k to $400k',
    time: '1.8 Years',
    driver: 'Pure Compounding',
    effort: 'The Effortless Phase. Compounding does the heavy lifting.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  }
];

export default function WhyWealthExplodesUS() {
  return (
    <main className="min-h-screen pt-24 pb-16">

    </main>
  );
}
