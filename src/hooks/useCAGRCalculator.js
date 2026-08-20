import { useRegion } from '../context/RegionContext';
import { useState, useMemo } from 'react';

/**
 * useCAGRCalculator
 *
 * Uses the SAME monthly-rate convention as useCalculator.js (the main SIP page):
 *   monthly_rate  = annual_rate / 12            (APR, not EAR)
 *   SIP formula   = add SIP first, THEN compound (annuity-due)
 *
 * Without SIP:  CAGR = (FinalValue / InitialInvestment)^(1/years) - 1
 * With SIP:     Binary-search for monthly rate rm such that
 *                  lumpsum × (1+rm)^n  +  sip × (1+rm) × [(1+rm)^n − 1] / rm  =  FinalValue
 *               then display as APR: cagrPct = rm × 12 × 100
 *               (this matches the "Expected Return %" input on the SIP page)
 */
export function useCAGRCalculator() {
  const { isUS } = useRegion();
  const [initialInvestment, setInitialInvestment] = useState(isUS ? 10000 : 100000);   // ₹1 Lakh
  const [monthlySip,        setMonthlySip]        = useState(0);        // optional
  const [finalValue,        setFinalValue]        = useState(isUS ? 50000 : 500000);   // ₹5 Lakh
  const [duration,          setDuration]          = useState(10);       // years

  const results = useMemo(() => {
    const init  = Math.max(1, initialInvestment);
    const final = Math.max(1, finalValue);
    const yrs   = Math.max(1, duration);
    const sip   = Math.max(0, monthlySip);
    const n     = yrs * 12; // total months

    // Total invested (lump sum + all SIP payments)
    const totalSIPContributions = sip * n;
    const totalInvested         = init + totalSIPContributions;

    const absoluteGain = final - totalInvested;
    const gainPct      = parseFloat(((absoluteGain / totalInvested) * 100).toFixed(2));

    let monthlyRate; // the rm we'll solve for

    if (sip === 0) {
      // ── Lump-sum only: standard CAGR formula ──────────────────────
      // CAGR (annual) = (FV/PV)^(1/years) - 1
      const annualCAGR = Math.pow(final / init, 1 / yrs) - 1;
      // Convert to equivalent monthly rate for the table
      monthlyRate = annualCAGR / 12; // keep as APR monthly
    } else {
      // ── SIP (+ optional lump sum): binary search ──────────────────
      //
      // Formula matches useCalculator.js exactly:
      //   Each month: balance += SIP; balance *= (1 + rm);
      // Closed form (annuity-due):
      //   FV = init × (1+rm)^n  +  sip × (1+rm) × [(1+rm)^n − 1] / rm
      //
      const portfolioAtRate = (rm) => {
        if (Math.abs(rm) < 1e-10) return init + sip * n; // r → 0 limit
        const comp = Math.pow(1 + rm, n);
        // annuity-due: sip is added BEFORE each monthly compounding
        return init * comp + sip * (1 + rm) * (comp - 1) / rm;
      };

      let low = -0.99 / 12;
      let high = 5.0  / 12;   // allow up to ~500% p.a.
      let rm   = 0;

      for (let i = 0; i < 200; i++) {
        rm = (low + high) / 2;
        if (portfolioAtRate(rm) < final) {
          low = rm;
        } else {
          high = rm;
        }
      }

      monthlyRate = rm;
    }

    // ── Display as APR (matches how the SIP Calculator takes input) ──
    // APR = monthly_rate × 12
    // This way, if you use the same return rate in both calculators, the numbers agree.
    const cagrAPR = monthlyRate * 12;
    const cagrPct = parseFloat((cagrAPR * 100).toFixed(2));

    // Keep the internal CAGR as annual for the year-by-year table
    const cagr = cagrAPR; // we store APR as our "cagr"

    // ── Year-by-year table using annuity-due formula at monthlyRate ──
    const yearlyData = [];
    for (let y = 0; y <= yrs; y++) {
      const months = y * 12;
      let portfolioVal;
      if (Math.abs(monthlyRate) < 1e-10) {
        portfolioVal = init + sip * months;
      } else {
        const comp = Math.pow(1 + monthlyRate, months);
        if (sip > 0) {
          portfolioVal = init * comp + sip * (1 + monthlyRate) * (comp - 1) / monthlyRate;
        } else {
          portfolioVal = init * comp;
        }
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
