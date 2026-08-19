import GoalHub from '@/components/GoalHub';

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

    </div>
  );
}
