const fs = require('fs');
const path = require('path');

const draftPath = path.join('C:\\Users\\jccuk\\.gemini\\antigravity\\brain\\f96603ac-8f05-4b88-89ac-76adca4f3d55\\scratch\\swp_draft.js');
let content = fs.readFileSync(draftPath, 'utf8');

// Replace amounts
content = content.replace(/₹20,000/g, '$1,000');
content = content.replace(/₹60,00,000/g, '$300,000');
content = content.replace(/₹3\.8 Crores/g, '$1.9 Million');
content = content.replace(/₹3\.8 Crore/g, '$1.9 Million');
content = content.replace(/₹1,50,000/g, '$8,000');
content = content.replace(/₹1\.5 Lakhs/g, '$8,000');
content = content.replace(/₹3\.65\+ Crores/g, '$1.85+ Million');
content = content.replace(/₹12 Lakhs/g, '$60,000');
content = content.replace(/₹1\.25 Lakhs/g, '$44,000'); // Standard deduction or general tax-free threshold analogy

// Replace concepts
content = content.replace(/SIP/g, 'DCA');
content = content.replace(/Fixed Deposit \(FD\)/g, 'Certificate of Deposit (CD)');
content = content.replace(/Fixed Deposit/g, 'Certificate of Deposit');
content = content.replace(/FD/g, 'CD');
content = content.replace(/India/g, 'the US');
content = content.replace(/Nifty 50/g, 'S&P 500');

// Replace Tax logic
content = content.replace(/Long Term Capital Gains \(LTCG\) tax of 12\.5%/g, 'Long Term Capital Gains (LTCG) tax of 15%');
content = content.replace(/the first \$44,000 of equity gains every year are completely tax-free in the US./g, 'individuals in the 0% LTCG tax bracket (up to ~$44,625 in 2024) pay zero tax on those gains.');

// Replace links
content = content.replace(/href: '\/blog'/g, "href: '/us/blog'");
content = content.replace(/href="\/swp-calculator"/g, 'href="/us/swp-calculator"');
content = content.replace(/href="\/"/g, 'href="/us/dca-calculator"');
content = content.replace(/href="\/disclaimer"/g, 'href="/us/disclaimer"');
content = content.replace(/https:\/\/stepupcalculator\.com\/blog\/swp-vs-sip/g, 'https://stepupcalculator.com/us/blog/swp-vs-dca');

// Specifically change the canonical URL and ld+json url since SIP is DCA in the US path
content = content.replace(/swp-vs-sip/g, 'swp-vs-dca'); 
// But wait, the component name and file path might be different. 
// I'm writing it to `src/app/us/blog/swp-vs-sip/page.js` because the folder is `swp-vs-sip`. Actually wait, is the folder `swp-vs-sip`? Yes, earlier I didn't change folder names. Let me keep the canonical as `swp-vs-sip`.
content = content.replace(/swp-vs-dca/g, 'swp-vs-sip'); 

const usDest = path.join('C:\\Users\\jccuk\\OneDrive\\Desktop\\Rajat\\Antigravity\\src\\app\\us\\blog\\swp-vs-dca\\page.js');
fs.writeFileSync(usDest, content, 'utf8');
console.log('Done!');
