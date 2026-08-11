"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const pathname = usePathname();
  const [region, setRegion] = useState('IN'); // Default to India

  useEffect(() => {
    // Determine region based on URL path
    if (pathname && pathname.startsWith('/us')) {
      setRegion('US');
    } else {
      setRegion('IN');
    }
  }, [pathname]);

  const value = {
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
      lakh: region === 'US' ? 'Hundred Thousand' : 'Lakh'
    }
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
