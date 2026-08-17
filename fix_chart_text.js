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

      // Fix chart legend labels and axis ticks
      content = content.replace(/color:\s*'#1F2937'/g, "color: '#8B95A5'");
      content = content.replace(/color:\s*'#6B7280'/g, "color: '#8B95A5'");
      
      // Fix grid lines that are hardcoded to dark blue
      content = content.replace(/color:\s*'rgba\(27,58,92,0\.05\)'/g, "color: 'rgba(139,149,165,0.1)'");

      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log(`Fixed: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('\nDone.');
