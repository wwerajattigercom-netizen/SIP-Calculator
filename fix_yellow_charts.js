const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Change background from #F7EFCA to #f8f2ea
  // In globals.css
  if (filepath.endsWith('globals.css')) {
    newContent = newContent.replace(/--background:\s*#[0-9A-Fa-f]{6};/, '--background:   #f8f2ea;');
  }
  // Everywhere else
  newContent = replaceAll(newContent, 'bg-[#F7EFCA]', 'bg-[#f8f2ea]');
  newContent = replaceAll(newContent, 'bg-[#F5EFEB]', 'bg-[#f8f2ea]');
  newContent = replaceAll(newContent, 'bg-[#F3EBE1]', 'bg-[#f8f2ea]');

  // 2. Fix the Green vs Yellow issue
  // The amounts (text) are currently green: `text-[#059669]`. These should stay green.
  // The pie chart colors and dots are currently green: `bg-[#059669]`, `backgroundColor: '#059669'`, etc.
  // I must change these specific background/border/pie properties back to Yellow (#C4993C)
  
  // Revert background color for the dots
  newContent = replaceAll(newContent, 'bg-[#059669] mr-1.5', 'bg-[#C4993C] mr-1.5');
  
  // Revert pie chart arrays
  newContent = replaceAll(newContent, "'#1B3A5C', '#059669'", "'#1B3A5C', '#C4993C'");
  newContent = replaceAll(newContent, "'#1B3A5C', '#325C8C', '#059669'", "'#1B3A5C', '#325C8C', '#C4993C'");
  
  // Revert line chart background/border
  newContent = replaceAll(newContent, "backgroundColor: '#059669'", "backgroundColor: '#C4993C'");
  newContent = replaceAll(newContent, "borderColor: '#059669'", "borderColor: '#C4993C'");
  
  // CAGRResultSection dynamic color
  newContent = replaceAll(newContent, "const cagrColor = '#059669';", "const cagrColor = '#C4993C';");

  // ChartComponent.jsx colors
  newContent = replaceAll(newContent, "const returnsColor = '#059669';", "const returnsColor = '#C4993C';");

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
