"use client";

import React from 'react';
import Link from 'next/link';
import { Target, Home as HomeIcon, GraduationCap, TrendingUp, Wallet, Flame } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

export default function GoalHub() {
  const { isUS } = useRegion();

  const goals = [
    {
      title: 'General Goal Planner',
      desc: 'Calculate how much you need to invest monthly to reach any specific financial target.',
      icon: Target,
      href: isUS ? '/us/target-amount-calculator' : '/target-amount-calculator',
      color: '#1B3A5C'
    },
    {
      title: isUS ? 'Reach $1 Million' : 'Reach ₹1 Crore',
      desc: 'Find out the exact timeline and monthly investment needed to hit your first major milestone.',
      icon: TrendingUp,
      href: isUS ? '/us/tools/dca-to-reach-1-million' : '/tools/sip-to-reach-1-crore',
      color: '#059669'
    },
    {
      title: 'House Down Payment',
      desc: 'Plan your investments to afford the down payment for your dream home.',
      icon: HomeIcon,
      href: isUS ? '/us/tools/dca-for-house-down-payment' : '/tools/sip-for-house-down-payment',
      color: '#C4993C'
    },
    {
      title: 'Child Education',
      desc: 'Secure your child\'s future by calculating the inflation-adjusted cost of higher education.',
      icon: GraduationCap,
      href: isUS ? '/us/tools/dca-for-child-education' : '/tools/sip-for-child-education',
      color: '#991B1B'
    },
    {
      title: 'Retirement Corpus',
      desc: 'Calculate the total nest egg you need to maintain your lifestyle after you stop working.',
      icon: Wallet,
      href: isUS ? '/us/tools/retirement-dca-calculator' : '/tools/retirement-sip-calculator',
      color: '#1B3A5C'
    },
    {
      title: 'F.I.R.E Calculator',
      desc: 'Financial Independence, Retire Early. See when you can safely quit your day job.',
      icon: Flame,
      href: isUS ? '/us/tools/fire-calculator' : '/tools/fire-calculator',
      color: '#059669'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {goals.map((goal, i) => (
        <Link href={goal.href} key={i} className="group glass-panel p-6 rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(27,58,92,0.15)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border-t-4" style={{ borderTopColor: goal.color }}>
          <div>
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-opacity-10" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
              <goal.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--color-accent)] transition-colors">{goal.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{goal.desc}</p>
          </div>
          <div className="text-sm font-semibold flex items-center gap-1" style={{ color: goal.color }}>
            Start Planning <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
