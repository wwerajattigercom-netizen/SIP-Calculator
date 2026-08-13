"use client";
import Breadcrumb from '@/components/Breadcrumb';

export default function UlipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA vs Universal Life Insurance' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
          DCA vs Universal Life Insurance: Investment vs Insurance
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Never mix insurance and investment. Here is why mutual fund DCAs easily beat Universal Life Insurances over the long term.
        </p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. The Core Difference</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>DCA:</strong> A pure investment product. 100% of your money goes into the market.<br/>
          <strong>Universal Life Insurance:</strong> A hybrid product. A portion of your premium goes toward life insurance (mortality charges), and the rest is invested in the market.
        </p>

        <h2 className="text-xl font-bold text-foreground">2. Lock-in Period</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Mutual Fund DCAs (unless they are ELSS tax-savers) have zero lock-in. You can withdraw your money tomorrow. <br/>
          Universal Life Insurances have a strict mandatory 5-year lock-in period globally.
        </p>
      </div>
    </main>
  );
}
