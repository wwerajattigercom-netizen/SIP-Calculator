const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Result Cards
  // Total Value Card
  newContent = newContent.replace(
    /className="bg-\[#1B3A5C\] bg-opacity-20 border border-\[#1B3A5C\] rounded-lg p-2 flex flex-col justify-center shadow-\[0_0_15px_rgba\(27,58,92,0\.15\)\]"/g,
    'className="bg-[#F5EFEB] rounded-lg p-2 flex flex-col justify-center"'
  );
  // Invested Card
  newContent = replaceAll(newContent, 'bg-[rgba(27,58,92,0.1)] border border-[rgba(27,58,92,0.2)]', 'bg-[#F5EFEB]');
  // Earned Card
  newContent = replaceAll(newContent, 'bg-[rgba(196,153,60,0.1)] border border-[rgba(196,153,60,0.2)]', 'bg-[#F5EFEB]');
  newContent = replaceAll(newContent, 'bg-[rgba(13,148,136,0.1)] border border-[rgba(13,148,136,0.2)]', 'bg-[#F5EFEB]'); // catch missed ones

  // Also fix the Rule of 72 card below the three cards
  newContent = replaceAll(newContent, 'bg-[rgba(27,58,92,0.12)] border border-[rgba(27,58,92,0.25)]', 'bg-[#F5EFEB]');

  // Total Value card text: Since we changed it from dark blue background to light cream, text should be charcoal
  newContent = replaceAll(newContent, 'text-[#1B3A5C] text-[10px] mb-0.5 font-medium', 'text-gray-500 text-[10px] mb-0.5 font-medium');

  // Earned card icon: Make sure it's Gold `#C4993C`
  newContent = replaceAll(newContent, 'bg-[#0D9488] mr-1.5', 'bg-[#C4993C] mr-1.5');
  
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed cards in', filepath);
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
console.log('Done fixing cards!');
