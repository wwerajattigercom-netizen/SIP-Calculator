const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (entry.endsWith('.js') || entry.endsWith('.jsx')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;

      // 1. Revert pie chart colors back to #1B3A5C
      // In standalone calculators, we replaced ['#1B3A5C', '#C4993C'] with ['var(--color-accent)', '#C4993C']
      content = content.replace(/backgroundColor:\s*\['var\(--color-accent\)',\s*'#C4993C'\]/g, "backgroundColor: ['#1B3A5C', '#C4993C']");
      
      // In ChartComponent.jsx
      if (full.includes('ChartComponent.jsx')) {
        content = content.replace(/const colorInvested = isDark \? '#3B82F6' : 'var\(--color-accent\)';/g, "const colorInvested = '#1B3A5C';");
      }

      // 2. Fix CAGRResultSection.jsx white border
      if (full.includes('CAGRResultSection.jsx')) {
        content = content.replace(/borderColor:\s*'#FFFFFF',[\s\S]*?borderWidth:\s*4,/g, "borderColor: 'transparent',\n      borderWidth: 0,");
      }

      // 3. Just to be completely sure, replace any remaining pie border issues in standalone calculators
      // if they have borderColor: ['transparent', 'transparent'], let's keep them.

      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log(`Fixed: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('\nDone.');
