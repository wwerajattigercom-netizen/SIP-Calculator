const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (entry.endsWith('.js') || entry.endsWith('.jsx') || entry.endsWith('.css')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;

      // 1. globals.css: Set the new "middle blue" for dark mode
      if (full.endsWith('globals.css')) {
        content = content.replace(
          /(\.dark\s*\{[\s\S]*?)--color-accent:\s*#1B3A5C;\s*--color-accent-hover:\s*#112740;/g,
          "$1--color-accent:   #2A60A4;\n  --color-accent-hover: #1F4A81;"
        );
      }

      // 2. ChartComponent.jsx
      if (full.includes('ChartComponent.jsx')) {
        content = content.replace(/const colorInvested = '#1B3A5C';/g, "const colorInvested = 'var(--color-accent)';");
      }

      // 3. CAGRResultSection.jsx
      if (full.includes('CAGRResultSection.jsx')) {
        content = content.replace(
          /const pieColors = monthlySip > 0\s*\?\s*\['#1B3A5C', '#325C8C', '#C4993C'\]\s*:\s*\['#1B3A5C', '#C4993C'\];/g,
          "const pieColors = monthlySip > 0\n    ? ['var(--color-accent)', '#325C8C', '#C4993C']\n    : ['var(--color-accent)', '#C4993C'];"
        );
      }

      // 4. Standalone calculators
      if (full.includes('page.js') && !full.includes('CAGRResultSection')) {
        content = content.replace(/backgroundColor:\s*\['#1B3A5C',\s*'#C4993C'\]/g, "backgroundColor: ['var(--color-accent)', '#C4993C']");
      }

      // 5. Footer.jsx
      if (full.includes('Footer.jsx')) {
        content = content.replace(
          /className="w-full bg-\[#1B3A5C\] text-white pt-16 pb-8 border-t border-\[#112740\] mt-auto"/g,
          'className="w-full bg-[var(--color-accent)] text-white pt-16 pb-8 border-t border-[var(--color-accent-hover)] mt-auto"'
        );
      }

      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log(`Fixed: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('\nDone.');
