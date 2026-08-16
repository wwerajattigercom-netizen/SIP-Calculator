"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const pathname = usePathname();

  // Determine region synchronously — no useEffect/useState flash
  const isUSPath = pathname && pathname.startsWith('/us');
  const region = isUSPath ? 'US' : 'IN';

  const value = useMemo(() => ({
    region,
    isUS: region === 'US',
    currencySymbol: region === 'US' ? '$' : '₹',
    locale: region === 'US' ? 'en-US' : 'en-IN',
    currencyCode: region === 'US' ? 'USD' : 'INR',
    terms: {
      sip: region === 'US' ? 'DCA' : 'SIP',
      sipFull: region === 'US' ? 'Dollar Cost Averaging' : 'Systematic Investment Plan',
      lumpsum: region === 'US' ? 'One-time Investment' : 'Lump Sum',
      crore: region === 'US' ? 'Million' : 'Crore',
      lakh: region === 'US' ? 'Thousand' : 'Lakh'
    }
  }), [region]);

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
