const fs = require('fs');
const path = require('path');

const glowRegex = /<div className="absolute[^"]*mix-blend-screen filter blur-\[100px\][^"]*" \/>/g;
const glowRegex2 = /<div className={`absolute[^`]*mix-blend-screen filter blur-\[100px\][^`]*`} \/>/g;
// some blobs might not have self-closing tags
const glowRegex3 = /<div className="absolute[^"]*mix-blend-screen filter blur-\[100px\][^"]*"><\/div>/g;

const colorMap = {
  'bg-[#8b5cf6]': 'bg-[#1B3A5C]',
  'text-[#8b5cf6]': 'text-[#1B3A5C]',
  'text-white': 'text-[#1F2937]',
  'text-gray-400': 'text-gray-500',
  'text-gray-300': 'text-gray-600',
  'text-gray-200': 'text-gray-700',
  'bg-gray-800': 'bg-white',
  'bg-gray-900': 'bg-[#F8F6F3]',
  'bg-[#0f111a]': 'bg-[#F8F6F3]',
  // Replace dark translucent with light translucent for borders or hover
  'rgba(255,255,255,0.05)': 'rgba(0,0,0,0.03)',
  'rgba(255,255,255,0.1)': 'rgba(0,0,0,0.05)',
  'rgba(255,255,255,0.2)': 'rgba(0,0,0,0.1)',
  'rgba(255, 255, 255, 0.28)': 'rgba(0, 0, 0, 0.4)',
  'border-white/10': 'border-black/5',
  'border-white/20': 'border-black/10',
  'bg-white/5': 'bg-black/5',
  'bg-white/10': 'bg-black/5',
  'hover:bg-white/5': 'hover:bg-black/5',
  
  // Specific teal/navy accents
  'text-blue-400': 'text-[#1B3A5C]',
  'text-green-400': 'text-[#0D9488]',
  'text-amber-400': 'text-[#C4993C]',
  'text-orange-400': 'text-[#C4993C]',
  
  'bg-blue-400': 'bg-[#1B3A5C]',
  'bg-green-400': 'bg-[#0D9488]',
  'bg-amber-400': 'bg-[#C4993C]',
};

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Remove glow blobs
  newContent = newContent.replace(glowRegex, '');
  newContent = newContent.replace(glowRegex2, '');
  newContent = newContent.replace(glowRegex3, '');

  // Replace colors
  for (const [oldVal, newVal] of Object.entries(colorMap)) {
    newContent = newContent.split(oldVal).join(newVal);
  }
  
  // Special case: fix the body inline style in layout.js if it exists, though I shouldn't need inline styles since globals.css is correct now.
  // Actually, I'll let layout.js just use standard body styling from globals.css.
  
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Cleaned', filepath);
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
console.log('Cleanup complete.');
