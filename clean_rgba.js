const fs = require('fs');
const path = require('path');

const rgbMap = {
  '139,92,246': '27,58,92', // Purple -> Navy
  '8b5cf6': '#1B3A5C', // Hex Purple
  '34,197,94': '13,148,136', // Green -> Teal
  '22C55E': '#0D9488', // Hex Green
  '59,130,246': '27,58,92', // Blue -> Navy
  '3B82F6': '#1B3A5C', // Hex Blue
  '234,179,8': '196,153,60', // Yellow -> Gold
  'F59E0B': '#C4993C', // Hex Yellow
  '245,158,11': '196,153,60', // Amber -> Gold
  '239,68,68': '220,38,38', // Red
  'EF4444': '#DC2626', // Hex Red
  '249,115,22': '196,153,60', // Orange -> Gold
  '255,255,255': '0,0,0', // White -> Black for glassmorphism
  'd8b4fe': '#1B3A5C',
  'c4b5fd': '#1B3A5C',
  'a78bfa': '#1B3A5C',
};

// Also replace specific named tailwind classes that might have been missed
const simpleReplace = {
  'bg-[rgba(255,255,255,0.03)]': 'bg-white',
  'bg-[rgba(255,255,255,0.05)]': 'bg-white',
  'border-white/5': 'border-[#E8E4DF]',
  'border-white/10': 'border-[#E8E4DF]',
  'text-gray-400': 'text-gray-500',
  'text-gray-300': 'text-gray-600',
  'text-white': 'text-[#1F2937]',
  'shadow-[0_0_24px_rgba(139,92,246,0.5)]': 'shadow-sm',
  'shadow-[0_0_24px_rgba(139,92,246,0.1)]': 'shadow-sm',
  'text-[#c4b5fd]': 'text-[#6B7280]',
  'text-[#d8b4fe]': 'text-[#1F2937]',
  'text-[#a78bfa]': 'text-[#1B3A5C]',
  'text-yellow-400': 'text-[#C4993C]',
  'text-[#14B8A6]': 'text-[#0D9488]',
  'text-[#EF4444]': 'text-[#DC2626]',
  'text-[#22C55E]': 'text-[#0D9488]',
};

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Replace simple strings
  for (const [oldVal, newVal] of Object.entries(simpleReplace)) {
    newContent = newContent.split(oldVal).join(newVal);
  }

  // 2. Replace rgba variants
  const rgbaRegex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/g;
  newContent = newContent.replace(rgbaRegex, (match, r, g, b, a) => {
    const key = `${r},${g},${b}`;
    if (rgbMap[key]) {
      // If it's a very low opacity white on the dark theme, make it slightly higher opacity black on light theme
      let alpha = parseFloat(a);
      if (key === '255,255,255' && alpha < 0.1) {
        alpha = alpha * 2; // e.g. 0.03 -> 0.06
      }
      return `rgba(${rgbMap[key]},${alpha})`;
    }
    return match;
  });
  
  // 3. Replace hex variants
  for (const [oldVal, newVal] of Object.entries(rgbMap)) {
    if (oldVal.length === 6) { // It's a hex
      newContent = newContent.split(`#${oldVal}`).join(newVal);
      newContent = newContent.split(`#${oldVal.toUpperCase()}`).join(newVal);
      newContent = newContent.split(`#${oldVal.toLowerCase()}`).join(newVal);
    }
  }

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Cleaned RGBA', filepath);
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
console.log('Advanced RGBA Cleanup complete.');
