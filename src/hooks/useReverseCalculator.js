import { useMemo, useState } from 'react';

export function useReverseCalculator() {
  const [targetAmount, setTargetAmount] = useState(10000000); // 1 Crore default
  const [timePeriod, setTimePeriod] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [stepUp, setStepUp] = useState(0);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    const r = returnRate / 12 / 100;
    const totalMonths = timePeriod * 12;
    
    // Function to calculate final maturity given a starting SIP
    const calculateMaturity = (startingSip) => {
      let balance = initialInvestment;
      let currentSIP = startingSip;
      
      for (let month = 1; month <= totalMonths; month++) {
        balance += currentSIP;
        balance *= (1 + r);
        
        if (month % 12 === 0) {
          currentSIP += currentSIP * (stepUp / 100);
        }
      }
      return balance;
    };

    // Edge case: if initial investment alone exceeds target amount, required SIP is 0
    let requiredSip = 0;
    if (calculateMaturity(0) >= targetAmount) {
      requiredSip = 0;
    } else {
      // Binary Search for the required SIP
      let low = 0;
      let high = targetAmount; 
      
      // 50 iterations is enough to converge
      for (let i = 0; i < 50; i++) {
        let mid = (low + high) / 2;
        let maturity = calculateMaturity(mid);
        
        if (maturity < targetAmount) {
          low = mid;
        } else {
          high = mid;
          requiredSip = mid;
        }
      }
      requiredSip = Math.round(requiredSip);
    }
    
    // Calculate final true parameters using the requiredSip to generate chartData and milestones
    let balance = initialInvestment;
    let currentSIP = requiredSip;
    let totalInvested = initialInvestment;
    
    const chartData = [];
    chartData.push({ year: 0, invested: totalInvested, balance: balance });

    const CRORE = 10000000;
    const milestones = [];
    let nextMilestone = CRORE;
    let lastMilestoneYear = 0;

    for (let month = 1; month <= totalMonths; month++) {
      balance += currentSIP;
      totalInvested += currentSIP;
      
      balance *= (1 + r);
      
      // Check milestones
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
      requiredSip,
      totalInvested: totalInvestedRounded,
      amountEarned,
      actualAmount: fvNominal,
      inflationAdjustedAmount: fvReal,
      milestones,
      chartData
    };
  }, [targetAmount, timePeriod, returnRate, initialInvestment, stepUp, inflationRate]);

  return {
    state: { targetAmount, timePeriod, returnRate, initialInvestment, stepUp, inflationRate },
    setters: { setTargetAmount, setTimePeriod, setReturnRate, setInitialInvestment, setStepUp, setInflationRate },
    results
  };
}
