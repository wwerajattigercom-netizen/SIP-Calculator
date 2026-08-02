const monthlySip = 10000;
const timePeriod = 30;
const targetValue = 33206907;
const stepUp = 1;

let cashFlows = [];
let currentSip = monthlySip;
for (let y = 1; y <= timePeriod; y++) {
  for (let m = 1; m <= 12; m++) {
    cashFlows.push(currentSip);
  }
  currentSip += currentSip * (stepUp / 100);
}

function getFv(rate) {
  let balance = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    balance += cashFlows[i];
    balance *= (1 + rate);
  }
  return balance;
}

// binary search for rate
let low = 0;
let high = 1;
for (let i = 0; i < 100; i++) {
  let mid = (low + high) / 2;
  let fv = getFv(mid);
  if (fv > targetValue) {
    high = mid;
  } else {
    low = mid;
  }
}

let monthlyRate = (low + high) / 2;
let annualRate = monthlyRate * 12 * 100;
console.log("To get", targetValue, "the annual rate must be:", annualRate, "%");
