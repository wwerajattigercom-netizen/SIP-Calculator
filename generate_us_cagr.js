const fs = require('fs');
const path = require('path');

const draftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\cagr_draft.js');
let content = fs.readFileSync(draftPath, 'utf8');

content = content.replace(/₹1,00,000/g, '$100,000');
content = content.replace(/₹1,50,000/g, '$150,000');
content = content.replace(/₹2,01,135/g, '$201,135');
content = content.replace(/₹5,000/g, '$1,000');
content = content.replace(/₹3,00,000/g, '$60,000');
content = content.replace(/₹4,12,432/g, '$82,486');

content = content.replace(/Groww, Zerodha Coin, or Upstox/g, 'Vanguard, Fidelity, or Charles Schwab');
content = content.replace(/Groww or Zerodha Coin/g, 'your brokerage platform');
content = content.replace(/Like Zerodha and Groww/g, 'Platforms');

content = content.replace(/SIP/g, 'DCA');
content = content.replace(/SIPs/g, 'DCA strategies');
content = content.replace(/Indian Investors/g, 'Global Investors');

content = content.replace(/href: '\/blog'/g, "href: '/us/blog'");
content = content.replace(/href="\/cagr-calculator"/g, 'href="/us/cagr-calculator"');
content = content.replace(/href="\/"/g, 'href="/us/dca-calculator"');
content = content.replace(/href="\/disclaimer"/g, 'href="/us/disclaimer"');
content = content.replace(/https:\/\/stepupcalculator\.com\/blog\/cagr-vs-xirr-vs-absolute-return/g, 'https://stepupcalculator.com/us/blog/cagr-vs-xirr-vs-absolute-return');

const usDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\cagr-vs-xirr-vs-absolute-return\\page.js');
fs.writeFileSync(usDest, content, 'utf8');
console.log('Done!');
