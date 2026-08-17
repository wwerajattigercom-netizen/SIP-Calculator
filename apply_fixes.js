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

      // 1. Replace hardcoded dark blue with CSS variable for dark mode support
      content = content.replaceAll("'#1B3A5C'", "'var(--color-accent)'");
      content = content.replaceAll('bg-[#1B3A5C]', 'bg-[var(--color-accent)]');
      content = content.replaceAll('text-[#1B3A5C]', 'text-[var(--color-accent)]');
      content = content.replaceAll('border-[#1B3A5C]', 'border-[var(--color-accent)]');
      content = content.replaceAll("'#112740'", "'var(--color-accent-hover)'");
      content = content.replaceAll('bg-[#112740]', 'bg-[var(--color-accent-hover)]');

      // 2. Fix the pie chart borders
      content = content.replaceAll("borderColor: ['#FFFFFF', '#FFFFFF']", "borderColor: ['transparent', 'transparent'], borderWidth: 0");
      content = content.replaceAll("borderColor: isDark ? ['#242427', '#242427'] : ['#FFFFFF', '#FFFFFF']", "borderColor: 'transparent', borderWidth: 0");
      
      // Fix specific to CAGRResultSection
      content = content.replaceAll("borderColor:     '#FFFFFF',\n      borderWidth:     4,", "borderColor:     'transparent',\n      borderWidth:     0,");
      
      // 3. Fix the CAGR white badge background
      content = content.replaceAll("background: `#FFFFFF`,border: `1.5px solid ${cagrColor}`", "background: `var(--panel-bg)`,border: `1.5px solid ${cagrColor}`");

      // 4. Fix gray cards
      content = content.replaceAll(
        'bg-white/50 p-4 rounded-xl border border-[var(--color-accent)]/10',
        'bg-[var(--background)] p-4 rounded-xl border border-[var(--panel-border)]'
      );
      content = content.replaceAll(
        'bg-white/50 p-4 rounded-xl border border-[#C4993C]/20',
        'bg-[var(--background)] p-4 rounded-xl border border-[#C4993C]/30'
      );
      content = content.replaceAll(
        'p-4 rounded-xl bg-white/50 border border-[var(--panel-border)]',
        'p-4 rounded-xl bg-[var(--background)] border border-[var(--panel-border)]'
      );
      content = content.replaceAll(
        'grid grid-cols-12 gap-4 items-center bg-white/50 p-3 rounded-xl',
        'grid grid-cols-12 gap-4 items-center bg-[var(--background)] p-3 rounded-xl'
      );

      // 5. Fix XIRR + CAGR "rate" result card
      content = content.replaceAll(
        'text-center p-6 bg-white/60 rounded-xl border border-[var(--color-accent)]/10',
        'text-center p-6 bg-[var(--background)] rounded-xl border border-[var(--panel-border)]'
      );
      content = content.replaceAll(
        'text-center p-8 bg-white/60 rounded-xl border border-gray-200 flex flex-col items-center justify-center min-h-[200px]',
        'text-center p-8 bg-[var(--background)] rounded-xl border border-[var(--panel-border)] flex flex-col items-center justify-center min-h-[200px]'
      );

      // 6. Generic Sweep for bg-white/50 and 60
      content = content.replace(
        /className="([^"]*?)bg-white\/60([^"]*?)"/g,
        (match, before, after) => {
          if (match.includes('dark:')) return match; 
          return `className="${before}bg-[var(--background)] dark:bg-[var(--background)]${after}"`;
        }
      );
      content = content.replace(
        /className="([^"]*?)bg-white\/50([^"]*?)"/g,
        (match, before, after) => {
          if (match.includes('dark:')) return match; 
          return `className="${before}bg-[var(--background)] dark:bg-[var(--background)]${after}"`;
        }
      );

      // 7. Divider lines
      content = content.replaceAll('border-b border-gray-200', 'border-b border-[var(--panel-border)]');
      content = content.replaceAll('border border-gray-200', 'border border-[var(--panel-border)]');

      if (content !== orig) {
        fs.writeFileSync(full, content);
        console.log(`Fixed: ${full.replace(srcDir, '')}`);
      }
    }
  }
}

processDir(srcDir);
console.log('\nDone.');
