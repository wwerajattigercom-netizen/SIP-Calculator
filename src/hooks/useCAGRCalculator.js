import { useState, useMemo } from 'react';

/**
 * useCAGRCalculator
 *
 * Without SIP:  CAGR = (FinalValue / InitialInvestment)^(1/years) - 1
 * With SIP:     Solves for effective annual rate r such that:
 *                 InitialInvestment × (1+r/12)^(n×12)
 *               + monthlySip × [(1+r/12)^(n×12) - 1] / (r/12)
 *               = FinalValue
 *               Uses binary search (50 iterations → precision of ~0.000001%)
 */
export function useCAGRCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);   // ₹1 Lakh
  const [monthlySip,        setMonthlySip]        = useState(0);        // optional
  const [finalValue,        setFinalValue]        = useState(500000);   // ₹5 Lakh
  const [duration,          setDuration]          = useState(10);       // years

  const results = useMemo(() => {
    const init  = Math.max(1, initialInvestment);
    const final = Math.max(1, finalValue);
    const yrs   = Math.max(1, duration);
    const sip   = Math.max(0, monthlySip);
    const n     = yrs * 12; // total months

    // Total amount invested (lump sum + all SIP)
    const totalSIPContributions = sip * n;
    const totalInvested         = init + totalSIPContributions;

    // Absolute gain
    const absoluteGain = final - totalInvested;
    const gainPct      = parseFloat(((absoluteGain / totalInvested) * 100).toFixed(2));

    let cagr;

    if (sip === 0) {
      // Simple lump-sum CAGR
      cagr = Math.pow(final / init, 1 / yrs) - 1;
    } else {
      /**
       * Binary search for effective monthly rate r_m such that:
       * init × (1+r_m)^n  +  sip × [(1+r_m)^n - 1] / r_m  =  final
       *
       * Annual CAGR = (1 + r_m)^12 - 1
       */
      const portfolioAtRate = (rm) => {
        if (Math.abs(rm) < 1e-9) {
          // r ≈ 0: SIP FV = sip × n
          return init + sip * n;
        }
        const compounded = Math.pow(1 + rm, n);
        return init * compounded + sip * (compounded - 1) / rm;
      };

      let low  = -0.99 / 12; // allow negative rates
      let high = 5.0   / 12; // 500% annual max
      let rm   = 0;

      for (let i = 0; i < 100; i++) {
        rm = (low + high) / 2;
        const fv = portfolioAtRate(rm);
        if (fv < final) {
          low = rm;
        } else {
          high = rm;
        }
      }

      // Convert monthly rate → annual CAGR
      cagr = Math.pow(1 + rm, 12) - 1;
    }

    const cagrPct = parseFloat((cagr * 100).toFixed(2));

    // Year-by-year projection at the computed monthly rate
    const rm     = Math.pow(1 + cagr, 1 / 12) - 1;
    const yearlyData = [];
    for (let y = 0; y <= yrs; y++) {
      const months      = y * 12;
      let portfolioVal;
      if (Math.abs(rm) < 1e-9) {
        portfolioVal = init + sip * months;
      } else {
        const comp   = Math.pow(1 + rm, months);
        portfolioVal = init * comp + (sip > 0 ? sip * (comp - 1) / rm : 0);
      }
      const invested = init + sip * months;
      yearlyData.push({
        year:     y,
        value:    Math.round(portfolioVal),
        invested: Math.round(invested),
        gainAbs:  Math.round(portfolioVal - invested),
      });
    }

    return {
      cagr,
      cagrPct,
      absoluteGain,
      gainPct,
      totalInvested,
      initialInvestment: init,
      monthlySip:        sip,
      finalValue:        final,
      duration:          yrs,
      yearlyData,
    };
  }, [initialInvestment, monthlySip, finalValue, duration]);

  return {
    state:   { initialInvestment, monthlySip, finalValue, duration },
    setters: { setInitialInvestment, setMonthlySip, setFinalValue, setDuration },
    results,
  };
}
