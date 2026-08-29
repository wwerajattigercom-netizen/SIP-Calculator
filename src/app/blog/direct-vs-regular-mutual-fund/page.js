import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Calculator, Percent, Scale, Clock, IndianRupee, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function DirectVsRegularMutualFund() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between Direct and Regular mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both Direct and Regular plans invest in the same portfolio managed by the same fund manager. The only difference is the expense ratio. Regular plans include a distributor commission (0.5% to 1.5% annually), which is deducted from your returns. Direct plans eliminate this middleman cost, giving you higher returns over time."
        }
      },
      {
        "@type": "Question",
        "name": "How much more money do you make with Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 1% expense ratio difference compounding over 20 years on a monthly SIP of Rs 10,000 at 12% returns results in approximately Rs 12-15 Lakhs more wealth in the Direct plan. Over 30 years, this gap widens to Rs 50+ Lakhs. The longer your investment horizon, the more devastating the Regular plan commission becomes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I switch from Regular to Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can switch by placing a 'switch' request through your AMC website, MF Central, or platforms like Kuvera/Groww. Note that switching is treated as a redemption from the Regular plan and a fresh purchase in the Direct plan, which may trigger capital gains tax and exit load if applicable."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to invest in Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Direct plans are equally safe as Regular plans. Both are regulated by SEBI and managed by the same AMC. The underlying portfolio is identical. The only difference is you are not paying a distributor commission, which makes Direct plans strictly better in terms of returns."
        }
      },
      {
        "@type": "Question",
        "name": "Who should choose Regular mutual funds over Direct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular plans may be suitable for investors who want personalized advisory services, portfolio monitoring, and hand-holding from a financial advisor or distributor. If you are a complete beginner who needs someone to select funds, rebalance your portfolio, and guide you during market crashes, the advisory fee embedded in Regular plans could be worth it."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen pt-24 pb-16">

    </main>
  );
}
