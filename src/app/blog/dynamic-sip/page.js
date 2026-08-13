"use client";
import Breadcrumb from '@/components/Breadcrumb';

export default function DynamicSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Dynamic SIP' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
          Dynamic SIP (Market-Linked SIP)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Dynamic SIP takes the emotion out of investing by using algorithms to decide exactly how much you should invest this month based on whether the market is overvalued or undervalued.
        </p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">How Does it Work?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          A Dynamic SIP looks at market metrics (like the P/E ratio of the Nifty 50). 
          If the P/E ratio is high (the market is expensive), the Dynamic SIP automatically reduces your investment amount. 
          If the P/E ratio is low (the market is cheap), it increases your investment amount to buy more units.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
          This is often offered by platforms as a "Smart SIP" feature, providing a hands-off approach to advanced market timing.
        </p>
      </div>
    </main>
  );
}
