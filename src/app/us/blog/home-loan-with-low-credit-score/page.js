import Link from 'next/link';
import { ShieldCheck, TrendingDown, AlertTriangle, CheckCircle, Users, ArrowRight, Home, Banknote, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function HomeLoanLowCreditScore() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'Low Credit Score Mortgage' }]} />
        
        {/* HEADER SECTION */}
        <header className="mb-10 mt-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            How to Get a Home Loan with a Low Credit Score (Below 650)
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>By StepupCalculator</span>
            <span>•</span>
            <span>3 min read</span>
          </div>
        </header>

        <article className="space-y-8">
          
          {/* BOX 1: Introduction */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed m-0 font-medium">
                  In the US, lenders consider a FICO credit score of 740 or higher as the gold standard for conventional mortgages. But what if your score is 620? Or 580? Does a past credit card mistake mean you can never buy a home? 
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-3 m-0">
                  Absolutely not. While getting a mortgage with a low credit score is harder, it is entirely possible if you use government-backed loans or specific lending strategies. Here is exactly how to do it.
                </p>
              </div>
            </div>
          </div>

          {/* BOX 2: The Baseline */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Understand Where You Stand (The FICO Tiers)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Before applying, you need to know exactly how lenders view your current score. Applying blindly and getting rejected will result in hard inquiries that drop your score even further.
            </p>
            
            <div className="grid gap-4">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-green-800 dark:text-green-400 block">740 to 850 (Excellent)</strong>
                  <span className="text-sm text-green-700 dark:text-green-500">Instant approval for Conventional Loans at the lowest prime interest rates.</span>
                </div>
                <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-yellow-800 dark:text-yellow-400 block">620 to 739 (Fair/Average)</strong>
                  <span className="text-sm text-yellow-700 dark:text-yellow-500">You qualify for a Conventional Loan, but you will pay a &quot;risk premium&quot; (higher interest).</span>
                </div>
                <ShieldCheck className="text-yellow-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-red-800 dark:text-red-400 block">500 to 619 (Poor)</strong>
                  <span className="text-sm text-red-700 dark:text-red-500">Conventional loans are out. You must use FHA, VA, or USDA government-backed loans.</span>
                </div>
                <TrendingDown className="text-red-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>
            </div>
          </div>

          {/* BOX 3: Strategy 1 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 1: Government-Backed FHA Loans
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If your score is below 620, traditional banks will likely reject you for a conventional mortgage. Your lifeline is an <strong>FHA Loan</strong>, which is backed by the Federal Housing Administration.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              FHA loans allow credit scores as low as <strong>580</strong> with just a 3.5% down payment. If you can put 10% down, some lenders will even accept a score of <strong>500</strong>. The catch? You will have to pay Mortgage Insurance Premiums (MIP) for the life of the loan, which makes your monthly payment higher.
            </p>
          </div>

          {/* BOX 4: Strategy 2 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Banknote className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 2: The Down Payment Leverage
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Most buyers aim to put 20% down to avoid Private Mortgage Insurance (PMI). If your credit score is weak, the bank sees a standard loan as high-risk. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You can instantly lower the bank&apos;s risk by offering a larger down payment—say 30% or 40%. By taking a smaller loan amount relative to the property value, the lender feels far more secure and is more likely to overlook a 620 credit score for a conventional loan.
            </p>
          </div>

          {/* BOX 5: Strategy 3 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 3: The Co-Signer Shield
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If your score is in the 500s, applying alone is risky. A highly effective strategy is to add a co-signer or co-borrower (like a working spouse or parent) who has a FICO score of 740+ and a stable income.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              When a high-scoring co-signer signs the loan, they become equally responsible for the debt. Keep in mind, however, that mortgage lenders usually look at the <em>lowest</em> median score between the two applicants. But having a co-signer heavily boosts your Debt-to-Income (DTI) ratio, making approval easier.
            </p>
          </div>

          {/* BOX 6: The True Cost (Penalty) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-t-4 border-[#991B1B] shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">The True Cost of a Low Score</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Lenders compensate for subprime credit scores by charging a higher interest rate. Let&apos;s look at how much a mere 1.5% difference costs you on a $400,000 mortgage over 30 years:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-3 font-semibold text-foreground">Scenario</th>
                    <th className="py-3 font-semibold text-foreground">Interest Rate</th>
                    <th className="py-3 font-semibold text-foreground">Monthly P&I</th>
                    <th className="py-3 font-semibold text-[var(--color-loss)]">Total Interest Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Excellent FICO</td>
                    <td className="py-3 font-medium">6.5%</td>
                    <td className="py-3 font-medium">$2,528</td>
                    <td className="py-3 font-bold text-foreground">$510,185</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 dark:text-gray-300">Low FICO</td>
                    <td className="py-3 font-medium">8.0%</td>
                    <td className="py-3 font-medium">$2,935</td>
                    <td className="py-3 font-bold text-[var(--color-loss)]">$656,625</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 m-0">
              *That 1.5% penalty costs you an extra $146,440 in interest! If possible, delay your purchase by 6-12 months and aggressively pay off revolving credit to repair your score first.
            </p>
          </div>

          {/* BOX 7: Call to Action */}
          <div className="glass-panel p-8 sm:p-12 text-center rounded-3xl border-t-4 border-[var(--color-accent)] shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">Calculate Your Mortgage Affordability</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Use our Mortgage Calculator to see exactly how much your monthly payments will be at different interest rates.
            </p>
            <Link href="/us/tools/mortgage-calculator" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Open Mortgage Calculator <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
