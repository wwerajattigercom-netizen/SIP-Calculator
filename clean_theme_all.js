const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Fix headings
  newContent = newContent.replace(
    /className="text-xl md:text-2xl font-extrabold tracking-tight text-(?:white|\[#1F2937\]) text-center"/g,
    'className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#1F2937]"'
  );
  
  // Remove gradients from titles
  newContent = newContent.replace(/<span className="text-gradient">([^<]+)<\/span>(\s*\{" "\})?(\s*—\s*)?/g, '$1 ');

  // 2. Fix the "How to Use This Calculator" and "Frequently Asked Questions" headers everywhere
  newContent = replaceAll(newContent, 'text-2xl font-bold text-white', 'text-2xl font-bold text-[#1F2937]');
  newContent = replaceAll(newContent, 'text-xl font-bold text-white', 'text-xl font-bold text-[#1F2937]');
  newContent = replaceAll(newContent, 'text-lg font-bold text-white', 'text-lg font-bold text-[#1F2937]');
  
  // Fix sub-headers inside FAQ and steps
  newContent = replaceAll(newContent, 'text-white font-semibold mb-1 text-sm', 'text-[#1F2937] font-semibold mb-1 text-sm');
  
  // Fix FAQ questions
  newContent = replaceAll(newContent, 'text-white font-medium text-sm md:text-base', 'text-[#1F2937] font-medium text-sm md:text-base');
  newContent = replaceAll(newContent, 'text-white font-medium text-sm pr-4', 'text-[#1F2937] font-medium text-sm pr-4');

  // Fix badges (1, 2, 3...)
  newContent = newContent.replace(
    /bg-\[#1B3A5C\] bg-opacity-30 border border-\[#1B3A5C\] flex items-center justify-center text-\[#6B7280\]/g,
    'bg-[#1B3A5C] flex items-center justify-center text-white shadow-sm'
  );

  // Fix total value small text
  newContent = replaceAll(newContent, 'text-white text-[10px] mb-0.5 font-medium', 'text-[#1B3A5C] text-[10px] mb-0.5 font-medium');

  // Fix Invested value which was text-white
  newContent = replaceAll(newContent, 'text-sm font-bold text-white', 'text-sm font-bold text-[#1F2937]');

  // Update chart legend/results colors from Teal to Gold for Returns
  newContent = replaceAll(newContent, 'bg-[rgba(13,148,136,0.1)]', 'bg-[rgba(196,153,60,0.1)]');
  newContent = replaceAll(newContent, 'border-[rgba(13,148,136,0.2)]', 'border-[rgba(196,153,60,0.2)]');
  // Be careful with replacing all bg-[#0D9488]. Let's specifically do it in ResultSections
  if (filepath.includes('ResultSection') || filepath.includes('TimeToGoal')) {
    newContent = replaceAll(newContent, 'bg-[#0D9488]', 'bg-[#C4993C]');
  }

  // Remove the heading icons if present (divs with bg-[#1B3A5C] p-2 rounded-xl mr-3)
  newContent = newContent.replace(/<div className="bg-\[#1B3A5C\] p-2 rounded-xl mr-3 shadow-\[0_0_15px_rgba\(27,58,92,0\.4\)\]">[\s\S]*?<\/div>/g, '');
  newContent = newContent.replace(/<div className="flex items-center justify-center mb-4 lg:mb-6">/g, '<div className="flex items-center justify-start mb-6 mt-4">');

  // Specific fix for lumpsum page tab text
  if (filepath.includes('lumpsum-calculator')) {
     // Active chart tab text is white, which is fine since background is Navy.
  }

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
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

scanDir(path.join(__dirname, 'src'));
console.log('Done!');
