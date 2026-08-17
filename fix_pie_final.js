const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
let fixedFiles = [];

function processDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (entry.endsWith('.js') || entry.endsWith('.jsx')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;

      // Fix ChartComponent.jsx — replace var(--color-accent) with proper JS logic
      if (full.includes('ChartComponent.jsx')) {
        content = content.replace(
          "const colorInvested = 'var(--color-accent)';",
          "const colorInvested = isDark ? '#1A73E8' : '#1B3A5C';"
        );
      }

      // Fix CAGRResultSection.jsx — replace var(--color-accent) with proper hex
      if (full.includes('CAGRResultSection.jsx')) {
        // Need to add theme detection first if not present
        if (!content.includes('useTheme')) {
          content = content.replace(
            "import { useRegion } from '../context/RegionContext';",
            "import { useRegion } from '../context/RegionContext';\nimport { useTheme } from 'next-themes';"
          );
          // Add theme logic after the region hook
          content = content.replace(
            "const { locale, currencyCode, isUS } = useRegion();",
            "const { locale, currencyCode, isUS } = useRegion();\n  const { theme, systemTheme } = useTheme();\n  const [mounted, setMounted] = React.useState(false);\n  React.useEffect(() => setMounted(true), []);\n  const currentTheme = theme === 'system' ? systemTheme : theme;\n  const isDark = mounted && currentTheme === 'dark';"
          );
        }
        content = content.replace(
          /const pieColors = monthlySip > 0\s*\?\s*\['var\(--color-accent\)', '#325C8C', '#C4993C'\]\s*:\s*\['var\(--color-accent\)', '#C4993C'\];/g,
          "const accentColor = isDark ? '#1A73E8' : '#1B3A5C';\n  const pieColors = monthlySip > 0\n    ? [accentColor, '#325C8C', '#C4993C']\n    : [accentColor, '#C4993C'];"
        );
      }

      // Fix standalone calculator pages — replace var(--color-accent) in backgroundColor arrays
      if (full.includes('page.js')) {
        // These pages don't have theme detection, so we need to hardcode #1B3A5C 
        // (light mode default — these pages work fine in light mode already)
        // But we need them to be dynamic. Let's just use #1B3A5C since Chart.js can't use CSS vars
        content = content.replace(
          /backgroundColor:\s*\['var\(--color-accent\)',\s*'#C4993C'\]/g,
          "backgroundColor: ['#1B3A5C', '#C4993C']"
        );
      }

      if (content !== orig) {
        fs.writeFileSync(full, content);
        fixedFiles.push(full.replace(srcDir, ''));
      }
    }
  }
}

processDir(srcDir);
fixedFiles.forEach(f => console.log(`Fixed: ${f}`));
console.log(`\nTotal: ${fixedFiles.length} files fixed.`);
