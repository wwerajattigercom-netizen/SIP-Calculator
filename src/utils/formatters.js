export function formatCurrency(value) {
  if (value === undefined || value === null) return '₹0';
  return '₹' + Math.round(value).toLocaleString('en-IN');
}

export function formatToShortWords(num) {
  if (num === undefined || num === null || num === 0) return "Zero";
  
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.?0+$/, '') + " Crore";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2).replace(/\.?0+$/, '') + " Lakh";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.?0+$/, '') + " Thousand";
  }
  
  return num.toString();
}
