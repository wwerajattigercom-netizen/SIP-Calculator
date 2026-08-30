import Link from 'next/link';
import { ShieldCheck, TrendingDown, AlertTriangle, CheckCircle, Users, ArrowRight, Home, Banknote, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function HomeLoanLowCibilScore() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Low CIBIL Home Loan' }]} />
        
        {/* HEADER SECTION */}
        <header className="mb-10 mt-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            How to Get a Home Loan with a Low CIBIL Score (Below 750)
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
                  In India, major banks consider a CIBIL score of 750 or higher as the gold standard for home loans. But what if your score is 680? Or 650? Does a past credit card mistake mean you can never buy a home? 
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-3 m-0">
                  Absolutely not. While getting a loan with a low CIBIL score is harder, it is entirely possible if you use the right strategies and approach the right lenders. Here is exactly how to do it.
                </p>
              </div>
            </div>
          </div>

          {/* BOX 2: The Baseline */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Understand Where You Stand (The CIBIL Tiers)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Before applying, you need to know exactly how lenders view your current score. Applying blindly and getting rejected will actually drop your score even further.
            </p>
            
            <div className="grid gap-4">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-green-800 dark:text-green-400 block">750 to 900 (Excellent)</strong>
                  <span className="text-sm text-green-700 dark:text-green-500">Instant approval from PSU and Private Banks at the lowest interest rates.</span>
                </div>
                <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-yellow-800 dark:text-yellow-400 block">650 to 749 (Fair/Average)</strong>
                  <span className="text-sm text-yellow-700 dark:text-yellow-500">Possible approval, but you may be charged a &quot;risk premium&quot; (0.5% to 1.5% higher interest).</span>
                </div>
                <ShieldCheck className="text-yellow-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <strong className="text-red-800 dark:text-red-400 block">300 to 649 (Poor)</strong>
                  <span className="text-sm text-red-700 dark:text-red-500">Almost guaranteed rejection from major banks like SBI or HDFC. You must use alternative strategies.</span>
                </div>
                <TrendingDown className="text-red-600 w-6 h-6 flex-shrink-0 ml-4" />
              </div>
            </div>
          </div>

          {/* BOX 3: Strategy 1 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 1: The Co-Applicant Shield
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If your score is below 700, applying alone is risky. The single most effective strategy is to add a co-applicant (like your working spouse, parent, or sibling) who has a CIBIL score of 750+ and a stable income.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              When a high-scoring co-applicant signs the loan, they become equally responsible for the repayment. The bank relies heavily on their creditworthiness to approve the loan, effectively masking your low score. Plus, it increases your overall loan eligibility amount!
            </p>
          </div>

          {/* BOX 4: Strategy 2 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Banknote className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 2: The Down Payment Leverage
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Most buyers aim for an 80% LTV (Loan-to-Value) ratio, meaning they pay 20% upfront. If your CIBIL score is weak, the bank sees an 80% loan as high-risk. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You can instantly lower the bank&apos;s risk by offering a larger down payment—say 30% or 40%. By taking a smaller loan amount relative to the property value, the lender feels more secure and is far more likely to overlook minor credit indiscretions.
            </p>
          </div>

          {/* BOX 5: Strategy 3 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              Strategy 3: Skip the Major Banks for HFCs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If your score is in the 650 range, major commercial banks (like SBI, BoB, or ICICI) might auto-reject your application based on their strict algorithms. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed m-0">
              Instead, approach <strong>Housing Finance Companies (HFCs)</strong> or Non-Banking Financial Companies (NBFCs). Institutions like LIC Housing Finance, Bajaj Housing Finance, or Aptus Value Housing are often more flexible. They will look at your current income stability, employment history, and bank statements rather than just blindly rejecting you for a past CIBIL dip.
            </p>
          </div>

          {/* BOX 6: The True Cost (Penalty) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-t-4 border-[#991B1B] shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">The True Cost of a Low Score</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Lenders compensate for low credit scores by charging a higher interest rate (a risk premium). Let&apos;s look at how much a mere 1% difference costs you on a ₹50 Lakh home loan over 20 years:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-3 font-semibold text-foreground">Scenario</th>
                    <th className="py-3 font-semibold text-foreground">Interest Rate</th>
                    <th className="py-3 font-semibold text-foreground">EMI</th>
                    <th className="py-3 font-semibold text-[var(--color-loss)]">Total Interest Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Excellent CIBIL</td>
                    <td className="py-3 font-medium">8.5%</td>
                    <td className="py-3 font-medium">₹43,391</td>
                    <td className="py-3 font-bold text-foreground">₹54.1 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 dark:text-gray-300">Low CIBIL</td>
                    <td className="py-3 font-medium">9.5%</td>
                    <td className="py-3 font-medium">₹46,607</td>
                    <td className="py-3 font-bold text-[var(--color-loss)]">₹61.8 Lakhs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 m-0">
              *That 1% penalty costs you an extra ₹7.7 Lakhs in interest! If possible, delay your purchase by 6-12 months and aggressively pay off credit cards to repair your score first.
            </p>
          </div>

          {/* BOX 7: Call to Action */}
          <div className="glass-panel p-8 sm:p-12 text-center rounded-3xl border-t-4 border-[var(--color-accent)] shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">Calculate Your Loan Affordability</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Use our Home Loan EMI Calculator to see exactly how much your monthly payments will be at different interest rates.
            </p>
            <Link href="/tools/home-loan-calculator" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Open EMI Calculator <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
