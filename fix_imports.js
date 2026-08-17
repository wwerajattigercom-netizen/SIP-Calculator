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
      
      if (content.includes("useTheme()") && !content.includes("import { useTheme }")) {
        // Add it to the top right after "use client";
        content = content.replace('"use client";', '"use client";\nimport { useTheme } from \'next-themes\';');
        fs.writeFileSync(full, content);
        console.log(`Fixed missing import in: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Finished fixing imports.');
