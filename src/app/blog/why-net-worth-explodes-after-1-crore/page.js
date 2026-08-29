import Link from 'next/link';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, Zap, Clock, ShieldCheck, ArrowUpCircle, PlusCircle, Lightbulb } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Why the First 1 Crore is the Hardest (And Why Net Worth Explodes After)",
  description: "Discover the math and psychology behind why reaching your first 1 crore is the hardest part of investing, and how the power of compounding takes over afterward.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/why-net-worth-explodes-after-1-crore',
  }
};

const STAGES = [
  {
    target: '₹0 to ₹1 Crore',
    time: '12.5 Years',
    driver: 'Your Savings & Discipline',
    effort: 'The Grind Phase. You are pushing a heavy snowball uphill.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    target: '₹1 Crore to ₹2 Crore',
    time: '4.5 Years',
    driver: '50% Savings, 50% Compounding',
    effort: 'The Momentum Phase. The snowball is moving itself.',
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    target: '₹2 Crore to ₹3 Crore',
    time: '3 Years',
    driver: 'Mostly Compounding',
    effort: 'The Explosion Phase. Your money earns more than you do.',
    icon: Zap,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-[var(--color-accent)]/10'
  },
  {
    target: '₹3 Crore to ₹4 Crore',
    time: '2.2 Years',
    driver: 'Pure Compounding',
    effort: 'The Effortless Phase. Compounding does the heavy lifting.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  }
];

export default function WhyNetWorthExplodes() {
  return (
    <main className="min-h-screen pt-24 pb-16">

    </main>
  );
}
