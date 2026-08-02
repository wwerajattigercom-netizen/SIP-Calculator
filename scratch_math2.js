const monthlySip = 10000;
const timePeriod = 30;
const returnRate = 12;
const stepUp = 1;

let balance = 0;
let invested = 0;
let currentSip = monthlySip;
let r = Math.pow(1 + (returnRate / 100), 1 / 12) - 1;

for (let m = 1; m <= timePeriod * 12; m++) {
  balance += currentSip;
  invested += currentSip;
  balance *= (1 + r);
  if (m % 12 === 0) currentSip += currentSip * (stepUp / 100);
}
console.log("With EAY (Groww logic):", Math.round(balance), "Invested:", Math.round(invested));
