import GoalHub from '@/components/GoalHub';
import { ListOrdered } from 'lucide-react';

export const metadata = {
  title: "Financial Goal Planner Hub | SIP Calculators for Every Goal",
  description: "Plan your life's biggest milestones. Calculate SIPs required for a house down payment, child education, retirement, or reaching ₹1 Crore.",
  keywords: [
    "goal planner", "financial goals calculator", "sip for goal",
    "house down payment calculator", "child education planner", "retirement corpus calculator"
  ],
  alternates: {
    canonical: 'https://stepupcalculator.com/tools/goal-planner',
  }
};

export default function GoalPlannerPage() {
  return (
    <div className="max-w-6xl w-full mx-auto p-4 md:p-6 pb-20">
      
      <div className="mb-12 text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Financial Goal Planner Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
          Every dream has a price tag, and the best way to afford it is through disciplined investing. Select your financial goal below to calculate exactly how much you need to invest every month.
        </p>
      </div>

      <GoalHub />

      {/* ── STRATEGY SECTION ── */}
      <section aria-label="The Order of Financial Operations" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
            <ListOrdered className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">The Order of Financial Operations</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm md:text-base">
          Before diving into specific goals like buying a house or a car, it is crucial to prioritize your financial stability. Follow this order to build a solid foundation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              1
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Emergency Fund</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Build a safety net of 3 to 6 months of living expenses in a liquid savings account or liquid mutual fund to cover unexpected events.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#991B1B] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              2
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">High-Interest Debt</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Pay off credit card debt and high-interest personal loans. These interest rates will drain your wealth faster than investments can grow it.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              3
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Retirement / EPF</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Maximize contributions to retirement accounts like EPF, PPF, or NPS. Take full advantage of tax benefits and employer matching.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#C4993C] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              4
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Specific Goals</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Once the foundation is secure, start investing towards specific goals like buying a house, children's education, or building ₹1 Crore.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
