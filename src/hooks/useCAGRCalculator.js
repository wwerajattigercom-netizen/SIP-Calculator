import { useState, useMemo } from 'react';

/**
 * useCAGRCalculator
 *
 * CAGR = (Final Value / Initial Investment)^(1/years) - 1
 *
 * Inputs:  initialInvestment, finalValue, duration (years)
 * Outputs: CAGR %, absolute gain, gain %, year-by-year growth at that CAGR
 */
export function useCAGRCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);   // ₹1 Lakh
  const [finalValue,        setFinalValue]        = useState(500000);   // ₹5 Lakh
  const [duration,          setDuration]          = useState(10);       // 10 years

  const results = useMemo(() => {
    const init  = Math.max(1, initialInvestment);
    const final = Math.max(1, finalValue);
    const yrs   = Math.max(1, duration);

    // Core CAGR formula
    const cagr     = Math.pow(final / init, 1 / yrs) - 1;
    const cagrPct  = parseFloat((cagr * 100).toFixed(2));

    const absoluteGain = final - init;
    const gainPct      = parseFloat(((absoluteGain / init) * 100).toFixed(2));

    // Year-by-year projection at the computed CAGR
    const yearlyData = [];
    for (let y = 0; y <= yrs; y++) {
      yearlyData.push({
        year:    y,
        value:   Math.round(init * Math.pow(1 + cagr, y)),
        gainAbs: Math.round(init * Math.pow(1 + cagr, y) - init),
      });
    }

    return {
      cagr,
      cagrPct,
      absoluteGain,
      gainPct,
      initialInvestment: init,
      finalValue: final,
      duration: yrs,
      yearlyData,
    };
  }, [initialInvestment, finalValue, duration]);

  return {
    state:   { initialInvestment, finalValue, duration },
    setters: { setInitialInvestment, setFinalValue, setDuration },
    results,
  };
}
