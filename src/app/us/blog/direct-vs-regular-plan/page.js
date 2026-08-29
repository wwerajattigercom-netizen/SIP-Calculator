import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Scale, IndianRupee, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function DirectVsRegularPlan() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between no-load and load mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No-load funds do not charge a sales commission when you buy or sell shares. Load funds charge a front-end load (when you buy, typically 3-6%) or a back-end load (when you sell). Both invest in the same types of assets, but load funds eat into your returns due to the commission."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a 1% expense ratio difference cost over 30 years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On a $500/month DCA over 30 years at 10% annual return, a 1% expense ratio difference results in approximately $165,000 less wealth. The higher-fee fund effectively takes money from your retirement to pay advisors and fund managers."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use a financial advisor or invest directly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you need personalized financial planning, tax optimization, or behavioral coaching during market crashes, a fee-only advisor (who charges a flat fee, not commissions) can be worth it. If you are comfortable picking low-cost index funds yourself, investing directly through Vanguard, Fidelity, or Schwab saves you thousands in fees."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good expense ratio for a mutual fund or ETF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For passively managed index funds and ETFs, an expense ratio below 0.10% is excellent (many S&P 500 index funds charge 0.03%). For actively managed funds, anything below 0.50% is reasonable. Avoid funds charging over 1.0% unless they consistently outperform their benchmark after fees."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen pt-24 pb-16">

    </main>
  );
}
