const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (entry.endsWith('page.js')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;

      if (content.includes("backgroundColor: ['#1B3A5C', '#C4993C']") || content.includes("backgroundColor: ['#1A73E8', '#C4993C']")) {
        // 1. Add import if not present
        if (!content.includes("import { useTheme } from 'next-themes';")) {
          content = content.replace(/(import React.*?;\n)/, "$1import { useTheme } from 'next-themes';\n");
        }

        // 2. Add hook inside the component
        // Look for the export default function line
        const match = content.match(/export default function\s+\w+\(.*?\)\s*\{/);
        if (match && !content.includes("const { theme, systemTheme } = useTheme();")) {
          const hookCode = `
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : '#1B3A5C';
`;
          content = content.replace(match[0], match[0] + hookCode);
        }

        // 3. Replace hardcoded colours with the dynamic variable
        content = content.replace(/backgroundColor:\s*\['#(1B3A5C|1A73E8)',\s*'#C4993C'\]/g, "backgroundColor: [accentColor, '#C4993C']");
      }

      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log(`Fixed: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Done.');
