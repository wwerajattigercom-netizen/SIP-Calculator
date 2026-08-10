const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Pie chart colors
  // Old array: ['#1B3A5C', '#0D9488']
  newContent = replaceAll(newContent, "backgroundColor: ['#1B3A5C', '#0D9488']", "backgroundColor: ['#1B3A5C', '#C4993C']");
  newContent = replaceAll(newContent, "borderColor: ['#0f111a', '#0f111a']", "borderColor: ['#FFFFFF', '#FFFFFF']");
  
  // Line chart Earned/Wealth Value colors
  newContent = replaceAll(newContent, "borderColor: '#0D9488'", "borderColor: '#C4993C'");
  newContent = replaceAll(newContent, "backgroundColor: '#0D9488'", "backgroundColor: '#C4993C'");
  
  // If it's CAGRResultSection, we should also fix the border color to white
  newContent = replaceAll(newContent, "borderColor: ['#0f111a', '#0f111a']", "borderColor: ['#FFFFFF', '#FFFFFF']");
  newContent = replaceAll(newContent, "backgroundColor: [colorInvested, colorReturns]", "backgroundColor: ['#1B3A5C', '#C4993C']");
  
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed pie chart in', filepath);
  }
}

const files = [
  'src/app/lumpsum-calculator/page.js',
  'src/components/CAGRResultSection.jsx'
];

files.forEach(f => {
  processFile(path.join(__dirname, f));
});
console.log('Done fixing pie charts!');
