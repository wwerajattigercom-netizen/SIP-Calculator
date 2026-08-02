import { useMemo, useState } from 'react';

/**
 * useTimeToGoalCalculator
 *
 * Given a monthly SIP, target amount, return rate, lump sum, and step-up,
 * calculates HOW LONG it will take to reach the goal.
 * The primary output is the duration (years + months).
 */
export function useTimeToGoalCalculator() {
  const [targetAmount, setTargetAmount]         = useState(10000000);  // ₹1 Crore
  const [monthlySip, setMonthlySip]             = useState(10000);     // ₹10,000
  const [returnRate, setReturnRate]             = useState(12);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [stepUp, setStepUp]                     = useState(0);
  const [inflationRate, setInflationRate]       = useState(6);

  const results = useMemo(() => {
    const r = returnRate / 12 / 100;
    const MAX_MONTHS = 600; // 50 years max

    let balance     = initialInvestment;
    let currentSIP  = monthlySip;
    let totalInvested = initialInvestment;
    let goalMonth   = null;

    // year-by-year table data
    const yearlyData = [];

    for (let month = 1; month <= MAX_MONTHS; month++) {
      balance += currentSIP;
      totalInvested += currentSIP;
      balance *= (1 + r);

      // Yearly snapshot — push at end of each year
      if (month % 12 === 0) {
        yearlyData.push({
          year:      month / 12,
          balance:   Math.round(balance),
          invested:  Math.round(totalInvested),
          gains:     Math.round(balance - totalInvested),
        });

        // Apply step-up after every 12 months
        currentSIP += currentSIP * (stepUp / 100);
      }

      // Mark exact goal-crossing month (first time)
      if (goalMonth === null && balance >= targetAmount) {
        goalMonth = month;
      }
    }

    if (goalMonth === null) {
      // Goal not reachable in 50 years
      return {
        reachable: false,
        years: null,
        months: null,
        totalMonths: null,
        totalInvestedAtGoal: null,
        balanceAtGoal: null,
        gainsAtGoal: null,
        inflationAdjustedGoal: null,
        yearlyData,
      };
    }

    const totalMonths         = goalMonth;
    const years               = Math.floor(totalMonths / 12);
    const months              = totalMonths % 12;

    // Recalculate exact balance and invested at goal month
    let bal2      = initialInvestment;
    let sip2      = monthlySip;
    let invested2 = initialInvestment;
    for (let m = 1; m <= totalMonths; m++) {
      bal2      += sip2;
      invested2 += sip2;
      bal2      *= (1 + r);
      if (m % 12 === 0) sip2 += sip2 * (stepUp / 100);
    }

    const balanceAtGoal       = Math.round(bal2);
    const totalInvestedAtGoal = Math.round(invested2);
    const gainsAtGoal         = balanceAtGoal - totalInvestedAtGoal;

    const inflationMultiplier    = Math.pow(1 + inflationRate / 100, totalMonths / 12);
    const inflationAdjustedGoal  = Math.round(targetAmount / inflationMultiplier);

    return {
      reachable: true,
      years,
      months,
      totalMonths,
      totalInvestedAtGoal,
      balanceAtGoal,
      gainsAtGoal,
      inflationAdjustedGoal,
      yearlyData,
    };
  }, [targetAmount, monthlySip, returnRate, initialInvestment, stepUp, inflationRate]);

  return {
    state: { targetAmount, monthlySip, returnRate, initialInvestment, stepUp, inflationRate },
    setters: { setTargetAmount, setMonthlySip, setReturnRate, setInitialInvestment, setStepUp, setInflationRate },
    results,
  };
}
