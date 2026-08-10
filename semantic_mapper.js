const fs = require('fs');
const path = require('path');

const exactMappings = {
  'bg-[#0f111a]': 'bg-[var(--background)]',
  'bg-[#8b5cf6]': 'bg-[var(--color-accent)]',
  'text-[#8b5cf6]': 'text-[var(--color-accent)]',
  'border-[#8b5cf6]': 'border-[var(--color-accent)]',
  'text-white': 'text-[var(--text-primary)]',
  'text-gray-400': 'text-[var(--text-muted)]',
  'text-gray-500': 'text-[var(--text-muted)]',
  'text-gray-300': 'text-[var(--text-muted)]',
  'bg-gray-800': 'bg-[var(--panel-bg)]',
  'bg-gray-900': 'bg-[var(--background)]',
  'border-gray-700': 'border-[var(--panel-border)]',
  'border-gray-800': 'border-[var(--panel-border)]',
  'border-white/5': 'border-[var(--panel-border)]',
  'border-white/10': 'border-[var(--panel-border)]',
  'bg-[rgba(255,255,255,0.03)]': 'bg-[var(--glass-highlight)]',
  'bg-[rgba(255,255,255,0.05)]': 'bg-[var(--glass-highlight-hover)]',
  'bg-[rgba(255,255,255,0.02)]': 'bg-[var(--glass-highlight)]',
  'bg-[rgba(0,0,0,0.3)]': 'bg-[var(--glass-highlight)]',
  'text-[#c4b5fd]': 'text-[var(--text-muted)]',
  'text-[#d8b4fe]': 'text-[var(--text-primary)]',
  'text-[#a78bfa]': 'text-[var(--color-accent)]',
  'bg-[#3b82f6]': 'bg-[var(--color-accent)]',
  'text-[#3b82f6]': 'text-[var(--color-accent)]'
};

const regexMappings = [
  // Purple RGB replacements (139,92,246)
  { regex: /bg-\[rgba\(139,92,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `bg-[var(--color-accent)]/[${alpha}]` },
  { regex: /border-\[rgba\(139,92,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `border-[var(--color-accent)]/[${alpha}]` },
  { regex: /from-\[rgba\(139,92,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `from-[var(--color-accent)]/[${alpha}]` },
  { regex: /to-\[rgba\(139,92,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `to-[var(--color-accent)]/[${alpha}]` },
  { regex: /shadow-\[0_0_24px_rgba\(139,92,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `shadow-md` },
  
  // Blue RGB replacements (59,130,246)
  { regex: /bg-\[rgba\(59,130,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `bg-[var(--color-accent)]/[${alpha}]` },
  { regex: /border-\[rgba\(59,130,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `border-[var(--color-accent)]/[${alpha}]` },
  { regex: /from-\[rgba\(59,130,246,([0-9.]+)\)\]/g, replace: (m, alpha) => `from-[var(--color-accent)]/[${alpha}]` },

  // Green (Success) RGB replacements (34,197,94 or 16,185,129)
  { regex: /bg-\[rgba\(34,197,94,([0-9.]+)\)\]/g, replace: (m, alpha) => `bg-[var(--color-returns)]/[${alpha}]` },
  { regex: /border-\[rgba\(34,197,94,([0-9.]+)\)\]/g, replace: (m, alpha) => `border-[var(--color-returns)]/[${alpha}]` },
  
  // Red (Loss) RGB replacements (239,68,68)
  { regex: /bg-\[rgba\(239,68,68,([0-9.]+)\)\]/g, replace: (m, alpha) => `bg-[var(--color-loss)]/[${alpha}]` },
  { regex: /border-\[rgba\(239,68,68,([0-9.]+)\)\]/g, replace: (m, alpha) => `border-[var(--color-loss)]/[${alpha}]` },
  
  // Generic Black/White alpha replacements
  { regex: /bg-\[rgba\(0,0,0,([0-9.]+)\)\]/g, replace: (m, alpha) => `bg-black/[${alpha}]` },
];

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Exact strings
  for (const [oldVal, newVal] of Object.entries(exactMappings)) {
    // We want to replace these strings safely. Using split/join is fine.
    newContent = newContent.split(oldVal).join(newVal);
  }

  // 2. Regex patterns
  for (const pattern of regexMappings) {
    newContent = newContent.replace(pattern.regex, pattern.replace);
  }
  
  // 3. Fix active tabs which use specific conditional logic in CalculatorTabs.jsx
  // "text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
  newContent = newContent.replace(/shadow-\[0_0_15px_rgba\(139,92,246,0.3\)\]/g, 'shadow-md');

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Processed:', filepath);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

scanDir(path.join(__dirname, 'src'));
console.log('Semantic mapping complete.');
