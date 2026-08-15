const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Generate Dynamic SIP (US: dynamic-dca)
// ==========================================
const dynamicDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\dynamic_sip_draft.js');
let dynamicContent = fs.readFileSync(dynamicDraftPath, 'utf8');

dynamicContent = dynamicContent.replace(/₹10,000/g, '$1,000');
dynamicContent = dynamicContent.replace(/₹10k/g, '$1k');
dynamicContent = dynamicContent.replace(/₹20,000/g, '$2,000');
dynamicContent = dynamicContent.replace(/₹20k/g, '$2k');
dynamicContent = dynamicContent.replace(/₹5,000/g, '$500');

dynamicContent = dynamicContent.replace(/Dynamic SIP/g, 'Dynamic DCA');
dynamicContent = dynamicContent.replace(/Smart SIP/g, 'Smart DCA');
dynamicContent = dynamicContent.replace(/Freedom SIP/g, 'Freedom DCA');
dynamicContent = dynamicContent.replace(/Value SIP/g, 'Value Averaging');
dynamicContent = dynamicContent.replace(/SIP/g, 'DCA');
dynamicContent = dynamicContent.replace(/Kotak Mutual Fund/g, 'Fidelity');
dynamicContent = dynamicContent.replace(/ICICI Prudential/g, 'Schwab');
dynamicContent = dynamicContent.replace(/AMCs/g, 'brokerages');
dynamicContent = dynamicContent.replace(/AMC/g, 'Broker');
dynamicContent = dynamicContent.replace(/Liquid Fund/g, 'Money Market Fund');

dynamicContent = dynamicContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
dynamicContent = dynamicContent.replace(/href="\/"/g, 'href="/us/dca-calculator"');
dynamicContent = dynamicContent.replace(/https:\/\/stepupcalculator\.com\/blog\/dynamic-sip/g, 'https://stepupcalculator.com/us/blog/dynamic-dca');

const dynamicUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\dynamic-dca\\page.js');
fs.writeFileSync(dynamicUsDest, dynamicContent, 'utf8');

// ==========================================
// 2. Generate 7 Common SIP Mistakes (US: common-dca-mistakes)
// ==========================================
const mistakesDraftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\common_sip_mistakes_draft.js');
let mistakesContent = fs.readFileSync(mistakesDraftPath, 'utf8');

mistakesContent = mistakesContent.replace(/₹10,000/g, '$1,000');
mistakesContent = mistakesContent.replace(/₹50,000/g, '$5,000');
mistakesContent = mistakesContent.replace(/₹1 Lakh/g, '$10,000');
mistakesContent = mistakesContent.replace(/₹1,000/g, '$100');
mistakesContent = mistakesContent.replace(/₹15-20 Lakhs/g, '$150,000 - $200,000');
mistakesContent = mistakesContent.replace(/₹2 Crores/g, '$2 Million');
mistakesContent = mistakesContent.replace(/lakhs of rupees/g, 'thousands of dollars');

mistakesContent = mistakesContent.replace(/SIP/g, 'DCA');
mistakesContent = mistakesContent.replace(/AMCs/g, 'brokerages');
mistakesContent = mistakesContent.replace(/HDFC Bank and Reliance/g, 'Apple and Microsoft');

mistakesContent = mistakesContent.replace(/href: '\/blog'/g, "href: '/us/blog'");
mistakesContent = mistakesContent.replace(/href="\/blog\/step-up-sip"/g, 'href="/us/blog/step-up-dca"');
mistakesContent = mistakesContent.replace(/href="\/target-amount-calculator"/g, 'href="/us/target-amount-calculator"');
mistakesContent = mistakesContent.replace(/https:\/\/stepupcalculator\.com\/blog\/common-sip-mistakes/g, 'https://stepupcalculator.com/us/blog/common-dca-mistakes');

const mistakesUsDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\common-dca-mistakes\\page.js');
fs.writeFileSync(mistakesUsDest, mistakesContent, 'utf8');

console.log('Done!');
