const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Replace boring greys with subtle theme blue tint
  newContent = replaceAll(newContent, 'bg-gray-50', 'bg-[rgba(27,58,92,0.02)]');
  newContent = replaceAll(newContent, 'bg-slate-50', 'bg-[rgba(27,58,92,0.02)]');
  newContent = replaceAll(newContent, 'bg-gray-100', 'bg-[rgba(27,58,92,0.04)]');
  newContent = replaceAll(newContent, 'bg-slate-100', 'bg-[rgba(27,58,92,0.04)]');
  newContent = replaceAll(newContent, 'bg-[#F3F4F6]', 'bg-[rgba(27,58,92,0.04)]');
  newContent = replaceAll(newContent, 'bg-[#F9FAFB]', 'bg-[rgba(27,58,92,0.02)]');

  // 2. Fix the invisible text-white bug in sip-based-on-salary
  if (filepath.endsWith('sip-based-on-salary\\page.js') || filepath.endsWith('sip-based-on-salary/page.js')) {
    newContent = replaceAll(newContent, '<strong className="text-white">50% Needs:</strong>', '<strong className="text-[#1F2937]">50% Needs:</strong>');
    newContent = replaceAll(newContent, '<strong className="text-white">30% Wants:</strong>', '<strong className="text-[#1F2937]">30% Wants:</strong>');
  }

  // 3. Turn off fill in line charts to prevent muddy grey fills
  // In ChartComponent.jsx and any blog page with a line chart
  newContent = replaceAll(newContent, 'fill: true', 'fill: false');
  
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed', filepath);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

scanDir(path.join(__dirname, 'src'));
console.log('Done!');
