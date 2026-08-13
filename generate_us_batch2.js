const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Generate SIP vs STP (US: dca-vs-stp)
// ==========================================
const sipStpDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\sip_vs_stp_draft.js');
let sipStpContent = fs.readFileSync(sipStpDraftPath, 'utf8');

sipStpContent = sipStpContent.replace(/₹10 Lakhs/g, '$50,000');
sipStpContent = sipStpContent.replace(/₹10 Lakh/g, '$50,000');
sipStpContent = sipStpContent.replace(/₹8 Lakhs/g, '$40,000');
sipStpContent = sipStpContent.replace(/₹1 Lakh/g, '$5,000');

sipStpContent = sipStpContent.replace(/SIP/g, 'DCA');
sipStpContent = sipStpContent.replace(/Systematic Investment Plan/g, 'Dollar Cost Averaging');
sipStpContent = sipStpContent.replace(/Nifty 50/g, 'S&P 500');
sipStpContent = sipStpContent.replace(/Liquid Fund or Debt Fund/g, 'Money Market Fund or Treasury ETF');
sipStpContent = sipStpContent.replace(/Liquid, Ultra Short Duration, or Arbitrage fund/g, 'Money Market, Ultra-Short Treasury, or Cash Equivalent fund');
sipStpContent = sipStpContent.replace(/HDFC Liquid Fund/g, 'Vanguard Federal Money Market Fund');
sipStpContent = sipStpContent.replace(/HDFC Flexi Cap Fund/g, 'Vanguard 500 Index Fund');
sipStpContent = sipStpContent.replace(/HDFC to SBI/g, 'Vanguard to Fidelity');
sipStpContent = sipStpContent.replace(/Groww, Zerodha, Kuvera/g, 'Vanguard, Fidelity, Schwab');
sipStpContent = sipStpContent.replace(/AMC/g, 'Fund Family');

// Taxation Warning Adjustments
sipStpContent = sipStpContent.replace(/Short-Term Capital Gains \(STCG\)/g, 'Short-Term Capital Gains');

sipStpContent = sipStpContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
sipStpContent = sipStpContent.replace(/href="\/blog\/sip-vs-lumpsum"/g, 'href="/us/blog/dca-vs-lumpsum"');
sipStpContent = sipStpContent.replace(/href="\/"/g, 'href="/us/dca-calculator"');
sipStpContent = sipStpContent.replace(/https:\/\/stepupcalculator\.com\/blog\/sip-vs-stp/g, 'https://stepupcalculator.com/us/blog/dca-vs-stp');

const sipStpUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\dca-vs-stp\\page.js');
fs.writeFileSync(sipStpUsDest, sipStpContent, 'utf8');

// ==========================================
// 2. Generate Flexi SIP (US: flexi-dca)
// ==========================================
const flexiDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\flexi_sip_draft.js');
let flexiContent = fs.readFileSync(flexiDraftPath, 'utf8');

flexiContent = flexiContent.replace(/₹10,000/g, '$1,000');
flexiContent = flexiContent.replace(/₹5,000/g, '$500');
flexiContent = flexiContent.replace(/₹25,000/g, '$2,500');
flexiContent = flexiContent.replace(/₹2 Lakhs/g, '$20,000');
flexiContent = flexiContent.replace(/₹50,000/g, '$5,000');

flexiContent = flexiContent.replace(/Flexi SIP/g, 'Flexi DCA');
flexiContent = flexiContent.replace(/Flexible SIP/g, 'Flexible DCA');
flexiContent = flexiContent.replace(/SIP/g, 'DCA');
flexiContent = flexiContent.replace(/Nifty 50/g, 'S&P 500');
flexiContent = flexiContent.replace(/AMCs \(Asset Management Companies\)/g, 'Brokerages (like Fidelity or Schwab)');
flexiContent = flexiContent.replace(/AMC/g, 'Broker');
flexiContent = flexiContent.replace(/NACH or e-Mandate/g, 'ACH auto-draft');
flexiContent = flexiContent.replace(/Smart DCA/g, 'Smart DCA'); // Already handled SIP->DCA
flexiContent = flexiContent.replace(/Value DCA/g, 'Value Averaging');

flexiContent = flexiContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
flexiContent = flexiContent.replace(/href="\/blog\/sip-during-market-crash"/g, 'href="/us/blog/dca-during-market-crash"');
flexiContent = flexiContent.replace(/https:\/\/stepupcalculator\.com\/blog\/flexi-sip/g, 'https://stepupcalculator.com/us/blog/flexi-dca');

// In case the canonical URL replacement for SIP got mangled
flexiContent = flexiContent.replace(/flexi-dca\b/g, 'flexi-dca'); // Just ensuring

const flexiUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\flexi-dca\\page.js');
fs.writeFileSync(flexiUsDest, flexiContent, 'utf8');

console.log('Done!');
