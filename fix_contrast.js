const fs = require('fs');
const path = require('path');

const iconRegex = /(<(?:Calculator|TrendingUp|Info|Target|Layers|Coins|ShieldAlert)[^>]*className="[^"]*)text-\[#1F2937\]([^"]*")(\s*\/>)/g;
// also cover the badge backgrounds like bg-[#1B3A5C] having text-[#1F2937] inside them
const badgeRegex = /(bg-\[#1B3A5C\][^>]*>[\s\S]*?)text-\[#1F2937\]/g;

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Change specific icon colors to white if they were accidentally made charcoal
  newContent = newContent.replace(iconRegex, '$1text-white$2$3');
  
  // A second pass to catch badges
  newContent = newContent.replace(badgeRegex, '$1text-white');
  
  // also specifically fix the recommended/start now badges which were given text-[#1F2937] inside bg-[#1B3A5C]
  newContent = newContent.replace(/bg-\[#1B3A5C\] text-\[#1F2937\]/g, 'bg-[#1B3A5C] text-white');
  newContent = newContent.replace(/bg-\[#0D9488\] text-\[#1F2937\]/g, 'bg-[#0D9488] text-white');
  newContent = newContent.replace(/bg-red-500 text-\[#1F2937\]/g, 'bg-red-500 text-white');

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed contrast in', filepath);
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
console.log('Contrast fix complete.');
