"use client";

import { useRegion } from '../context/RegionContext';
import { useState, useEffect, useMemo } from 'react';

export function useCalculator() {
  const { isUS } = useRegion();
  // Default values matching the requirements
  const [monthlySip, setMonthlySip] = useState(isUS ? 1000 : 10000);
  const [timePeriod, setTimePeriod] = useState(30);
  const [returnRate, setReturnRate] = useState(isUS ? 10 : 12);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [stepUp, setStepUp] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);

  const results = useMemo(() => {
    let currentSIP = monthlySip;
    let totalInvested = initialInvestment;
    let balance = initialInvestment;
    
    // Simple monthly rate (nominal_annual / 12) — standard for Indian SIP calculators (used by Dhan, SEBI/AMFI standard)
    const r = returnRate / 12 / 100;
    
    const chartData = [];
    chartData.push({ year: 0, invested: totalInvested, balance: balance });

    const totalMonths = timePeriod * 12;
    const CRORE = 10000000; // ₹1 Crore
    const milestones = [];          // { crore, yearReached, yearsSinceLast }
    let nextMilestone = CRORE;
    let lastMilestoneYear = 0;

    for (let month = 1; month <= totalMonths; month++) {
      balance += currentSIP;
      totalInvested += currentSIP;
      
      balance *= (1 + r);

      // Check crore milestones every month for accuracy
      while (balance >= nextMilestone) {
        const yearReached = parseFloat((month / 12).toFixed(1));
        const yearsSinceLast = parseFloat((yearReached - lastMilestoneYear).toFixed(1));
        milestones.push({
          crore: nextMilestone / CRORE,
          yearReached,
          yearsSinceLast,
        });
        lastMilestoneYear = yearReached;
        nextMilestone += CRORE;
      }
      
      if (month % 12 === 0) {
        chartData.push({ 
          year: month / 12, 
          invested: Math.round(totalInvested), 
          balance: Math.round(balance) 
        });
        currentSIP += currentSIP * (stepUp / 100);
      }
    }

    const totalInvestedRounded = Math.round(totalInvested);
    const fvNominal = Math.round(balance);
    const amountEarned = fvNominal - totalInvestedRounded;
    
    const inflationMultiplier = Math.pow(1 + (inflationRate / 100), timePeriod);
    const fvReal = Math.round(fvNominal / inflationMultiplier);
    
    return {
      totalInvested: totalInvestedRounded,
      amountEarned,
      actualAmount: fvNominal,
      inflationAdjustedAmount: fvReal,
      milestones,
      chartData
    };
  }, [monthlySip, timePeriod, returnRate, initialInvestment, stepUp, inflationRate]);

  return {
    state: {
      monthlySip,
      timePeriod,
      returnRate,
      initialInvestment,
      stepUp,
      inflationRate
    },
    setters: {
      setMonthlySip,
      setTimePeriod,
      setReturnRate,
      setInitialInvestment,
      setStepUp,
      setInflationRate
    },
    results
  };
}
