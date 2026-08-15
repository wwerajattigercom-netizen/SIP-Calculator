const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Generate Types of SIPs (US: types-of-dca)
// ==========================================
const typesDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\types_of_sip_draft.js');
let typesContent = fs.readFileSync(typesDraftPath, 'utf8');

typesContent = typesContent.replace(/₹10,000/g, '$1,000');
typesContent = typesContent.replace(/₹11,000/g, '$1,100');
typesContent = typesContent.replace(/₹5,000/g, '$500');

typesContent = typesContent.replace(/Types of SIP/g, 'Types of DCA');
typesContent = typesContent.replace(/Regular SIP/g, 'Regular DCA');
typesContent = typesContent.replace(/Step-Up SIP/g, 'Step-Up DCA');
typesContent = typesContent.replace(/Flexi SIP/g, 'Flexi DCA');
typesContent = typesContent.replace(/Trigger SIP/g, 'Trigger DCA');
typesContent = typesContent.replace(/Perpetual SIP/g, 'Perpetual DCA');
typesContent = typesContent.replace(/SIPs/g, 'DCAs');
typesContent = typesContent.replace(/SIP/g, 'DCA');
typesContent = typesContent.replace(/an SIP/g, 'a DCA');

typesContent = typesContent.replace(/AMC/g, 'Broker');
typesContent = typesContent.replace(/AMCs/g, 'brokerages');
typesContent = typesContent.replace(/Nifty 50/g, 'S&P 500');

typesContent = typesContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
typesContent = typesContent.replace(/href="\/blog\/step-up-sip"/g, 'href="/us/blog/step-up-dca"');
typesContent = typesContent.replace(/href="\/blog\/flexi-sip"/g, 'href="/us/blog/flexi-dca"');
typesContent = typesContent.replace(/href="\/blog\/trigger-sip"/g, 'href="/us/blog/trigger-dca"');
typesContent = typesContent.replace(/href="\/"/g, 'href="/us/dca-calculator"');
typesContent = typesContent.replace(/https:\/\/stepupcalculator\.com\/blog\/types-of-sip/g, 'https://stepupcalculator.com/us/blog/types-of-dca');

const typesUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\types-of-dca\\page.js');
fs.writeFileSync(typesUsDest, typesContent, 'utf8');

// ==========================================
// 2. Generate SIP for NRIs (US: dca-for-expats)
// ==========================================
// Note: "SIP for NRIs" is specifically an Indian concept. For the US version, we'll generalize it to "DCA for Expats" investing back in the US.
const nriDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\nri_sip_draft.js');
let nriContent = fs.readFileSync(nriDraftPath, 'utf8');

nriContent = nriContent.replace(/SIP for NRIs/g, 'DCA for Expats');
nriContent = nriContent.replace(/NRIs/g, 'Expats');
nriContent = nriContent.replace(/NRI/g, 'Expat');
nriContent = nriContent.replace(/Non-Resident Indians \(NRIs\)/g, 'US Expats');
nriContent = nriContent.replace(/Indian Mutual Funds/g, 'US Index Funds');
nriContent = nriContent.replace(/Indian mutual funds/g, 'US mutual funds');
nriContent = nriContent.replace(/Indian stock market/g, 'US stock market');
nriContent = nriContent.replace(/India/g, 'the US');

nriContent = nriContent.replace(/₹1.25 Lakhs/g, '$40,000');
nriContent = nriContent.replace(/₹/g, '$');

nriContent = nriContent.replace(/NRE Account \(Repatriable\)/g, 'Domestic US Bank Account');
nriContent = nriContent.replace(/NRO Account \(Non-Repatriable\)/g, 'Foreign Bank Account');
nriContent = nriContent.replace(/FEMA regulations/g, 'SEC regulations');
nriContent = nriContent.replace(/PAN Card/g, 'Social Security Number (SSN)');
nriContent = nriContent.replace(/FATCA/g, 'PFIC Rules');
nriContent = nriContent.replace(/TDS \(Tax Deducted at Source\)/g, 'Withholding Tax');
nriContent = nriContent.replace(/TDS/g, 'Withholding Tax');
nriContent = nriContent.replace(/ITR/g, 'Tax Return (1040)');

nriContent = nriContent.replace(/SIP/g, 'DCA');
nriContent = nriContent.replace(/AMC/g, 'Broker');
nriContent = nriContent.replace(/AMCs/g, 'brokerages');

nriContent = nriContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
nriContent = nriContent.replace(/href="\/"/g, 'href="/us/dca-calculator"');
nriContent = nriContent.replace(/https:\/\/stepupcalculator\.com\/blog\/sip-for-nris/g, 'https://stepupcalculator.com/us/blog/dca-for-expats');

const nriUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\dca-for-expats\\page.js');
fs.writeFileSync(nriUsDest, nriContent, 'utf8');

console.log('Done!');
