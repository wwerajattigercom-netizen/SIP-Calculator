// Dhan: SIP=10000, time=30yr, return=12%, inflation=4%, step-up=0%
// Expected: Total Investment = 36,00,000 | Returns = 72,83,383 | Future Value (Inflation Adj.) = 1,08,83,383

// Groww: SIP=10000, time=30yr, return=12%, step-up=1%
// Expected: Invested = 41,74,187 | Total Value = 3,32,06,907

const sip = 10000;
const years = 30;
const months = years * 12;

// =================== Method A: Simple monthly rate + annuity due (SIP added beginning) ===================
// r = nominal_annual / 12
const rSimple = 12 / 12 / 100; // 1%
let balA = 0, invA = 0, sipA = sip;
for (let m = 1; m <= months; m++) {
  balA += sipA; invA += sipA;
  balA *= (1 + rSimple);
  if (m % 12 === 0) sipA += sipA * (1/100); // 1% step-up
}
const nomA = Math.round(balA);
const realA = Math.round(nomA / Math.pow(1.04, years));
console.log(`Method A (Simple+stepup1%): Nominal=${nomA.toLocaleString('en-IN')}, Inflation-adj=${realA.toLocaleString('en-IN')}`);
// Reset for 0% step-up
let balA0 = 0, invA0 = 0;
for (let m = 1; m <= months; m++) {
  balA0 += sip; invA0 += sip;
  balA0 *= (1 + rSimple);
}
const nomA0 = Math.round(balA0);
const realA0 = Math.round(nomA0 / Math.pow(1.04, years));
console.log(`Method A (Simple+stepup0%+4%inf): Nominal=${nomA0.toLocaleString('en-IN')}, Inflation-adj=${realA0.toLocaleString('en-IN')}`);
console.log(`  Invested=${Math.round(invA0).toLocaleString('en-IN')}, Returns=${(nomA0-Math.round(invA0)).toLocaleString('en-IN')}`);

// =================== Method B: EAY rate + annuity due ===================
const rEAY = Math.pow(1.12, 1/12) - 1;
let balB = 0, sipB = sip;
for (let m = 1; m <= months; m++) {
  balB += sipB;
  balB *= (1 + rEAY);
  if (m % 12 === 0) sipB += sipB * (1/100); // 1% step-up
}
const nomB = Math.round(balB);
const realB = Math.round(nomB / Math.pow(1.04, years));
console.log(`\nMethod B (EAY+stepup1%): Nominal=${nomB.toLocaleString('en-IN')}, Inflation-adj=${realB.toLocaleString('en-IN')}`);
let balB0 = 0;
for (let m = 1; m <= months; m++) {
  balB0 += sip;
  balB0 *= (1 + rEAY);
}
const nomB0 = Math.round(balB0);
const realB0 = Math.round(nomB0 / Math.pow(1.04, years));
console.log(`Method B (EAY+stepup0%+4%inf): Nominal=${nomB0.toLocaleString('en-IN')}, Inflation-adj=${realB0.toLocaleString('en-IN')}`);

console.log("\n--- Target values ---");
console.log("Groww (stepup=1%, no inflation):  Total=3,32,06,907, Invested=41,74,187");
console.log("Dhan  (stepup=0%, inflation=4%):  Nominal(implied)=3,52,99,096, Inflation-adj=1,08,83,383, Invested=36,00,000");
