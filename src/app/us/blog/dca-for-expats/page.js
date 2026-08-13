"use client";
import Breadcrumb from '@/components/Breadcrumb';

export default function NriSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA for Expats' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
          DCA for Expats: A Complete Guide
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          If you live abroad but want to participate in the global market, setting up an DCA in global mutual funds is highly lucrative. Here is what you need to know.
        </p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. Can Expats Invest abroad?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Yes. Non-Resident Indians (Expats) can legally invest in global mutual funds. However, due to FATCA regulations, Expats based in the US and Canada have a slightly restricted list of AMCs they can invest with (e.g., L&T, UTI, SBI).
        </p>

        <h2 className="text-xl font-bold text-foreground">2. Repatriable vs Non-Repatriable Accounts</h2>
        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 mt-4">
          <li><strong>Repatriable Account (Repatriable):</strong> If you invest using foreign currency converted to local currency, the principal and profits can be freely transferred back to your country of residence without central bank permission.</li>
          <li><strong>Non-Repatriable Account (Non-Repatriable):</strong> If you invest using income generated <em>within</em> India (like rent), the funds are deposited here. There are strict limits on taking this money out of India.</li>
        </ul>
      </div>
    </main>
  );
}
