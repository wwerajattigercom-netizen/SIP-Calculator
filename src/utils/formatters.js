export function formatCurrency(value, locale = 'en-IN', currencyCode = 'INR') {
  if (value === undefined || value === null) return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(0);
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(Math.round(value));
}

export function formatToShortWords(num, isUS = false) {
  if (num === undefined || num === null || num === 0) return "Zero";
  
  if (isUS) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2).replace(/\.?0+$/, '') + " Billion";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2).replace(/\.?0+$/, '') + " Million";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.?0+$/, '') + "k";
    }
  } else {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2).replace(/\.?0+$/, '') + " Crore";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2).replace(/\.?0+$/, '') + " Lakh";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.?0+$/, '') + " Thousand";
    }
  }
  
  return num.toString();
}
