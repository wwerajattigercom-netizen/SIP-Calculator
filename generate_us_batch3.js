const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Generate Step-Up SIP (US: step-up-dca)
// ==========================================
const stepUpDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\step_up_sip_draft.js');
let stepUpContent = fs.readFileSync(stepUpDraftPath, 'utf8');

stepUpContent = stepUpContent.replace(/₹10,000/g, '$1,000');
stepUpContent = stepUpContent.replace(/₹10k/g, '$1k');
stepUpContent = stepUpContent.replace(/₹11,000/g, '$1,100');
stepUpContent = stepUpContent.replace(/₹12,100/g, '$1,210');
stepUpContent = stepUpContent.replace(/₹2,000/g, '$200');
stepUpContent = stepUpContent.replace(/₹50,000/g, '$5,000');
stepUpContent = stepUpContent.replace(/₹1\.5 Lakhs/g, '$15,000');
stepUpContent = stepUpContent.replace(/₹24,00,000/g, '$240,000');
stepUpContent = stepUpContent.replace(/₹99\.9 Lakhs/g, '$999,000');
stepUpContent = stepUpContent.replace(/₹68,73,000/g, '$687,300');
stepUpContent = stepUpContent.replace(/₹1\.97 Crores/g, '$1.97 Million');
stepUpContent = stepUpContent.replace(/rupees/g, 'dollars');

stepUpContent = stepUpContent.replace(/Step-Up SIP/g, 'Step-Up DCA');
stepUpContent = stepUpContent.replace(/Top-Up SIP/g, 'Top-Up DCA');
stepUpContent = stepUpContent.replace(/SIP/g, 'DCA');
stepUpContent = stepUpContent.replace(/AMCs/g, 'brokerages');
stepUpContent = stepUpContent.replace(/Groww, Zerodha Coin, or Kuvera/g, 'Fidelity, Vanguard, or Schwab');

stepUpContent = stepUpContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
stepUpContent = stepUpContent.replace(/href="\/"/g, 'href="/us/dca-calculator"'); // Not really step-up specific calc here, but it points to home in IN.
stepUpContent = stepUpContent.replace(/https:\/\/stepupcalculator\.com\/blog\/step-up-sip/g, 'https://stepupcalculator.com/us/blog/step-up-dca');
stepUpContent = stepUpContent.replace(/step-up-dca\b/g, 'step-up-dca'); // Just ensuring

const stepUpUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\step-up-dca\\page.js');
fs.writeFileSync(stepUpUsDest, stepUpContent, 'utf8');

// ==========================================
// 2. Generate Trigger SIP (US: trigger-dca)
// ==========================================
const triggerDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\trigger_sip_draft.js');
let triggerContent = fs.readFileSync(triggerDraftPath, 'utf8');

triggerContent = triggerContent.replace(/₹10,000/g, '$1,000');
triggerContent = triggerContent.replace(/₹10k/g, '$1k');
triggerContent = triggerContent.replace(/₹5,000/g, '$500');
triggerContent = triggerContent.replace(/₹5k/g, '$500');

triggerContent = triggerContent.replace(/Trigger SIP/g, 'Trigger DCA');
triggerContent = triggerContent.replace(/SIP/g, 'DCA');
triggerContent = triggerContent.replace(/Nifty 50/g, 'S&P 500');
triggerContent = triggerContent.replace(/Parag Parikh Flexi Cap/g, 'Fidelity Contrafund');

triggerContent = triggerContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
triggerContent = triggerContent.replace(/href="\/blog\/sip-during-market-crash"/g, 'href="/us/blog/dca-during-market-crash"');
triggerContent = triggerContent.replace(/https:\/\/stepupcalculator\.com\/blog\/trigger-sip/g, 'https://stepupcalculator.com/us/blog/trigger-dca');

const triggerUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\trigger-dca\\page.js');
fs.writeFileSync(triggerUsDest, triggerContent, 'utf8');

console.log('Done!');
