const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Make labels clearly visible
  newContent = replaceAll(newContent, 'text-gray-500 text-[10px] mb-0.5', 'text-[#1F2937] text-[11px] mb-0.5 font-semibold');
  newContent = replaceAll(newContent, 'text-gray-500 text-[10px] mb-0.5 font-medium', 'text-[#1F2937] text-[11px] mb-0.5 font-semibold');

  // Change amount colors
  // In ResultSection.jsx, TargetResultSection.jsx, etc.
  // "Invested" card has:
  // <div className="flex items-center text-gray-500 text-[10px] mb-0.5">
  //   <div className="w-2 h-2 rounded-full bg-[#1B3A5C] mr-1.5"></div>
  //   Invested
  // </div>
  // <div className="text-sm font-bold text-[#1F2937]">
  
  // We want to change the text color for the amounts.
  // This is a bit tricky with just replaceAll. Let's use regex that matches the block.
  
  // For Invested block:
  newContent = newContent.replace(
    /mr-1\.5"(?: \/>|><\/div>)Invested\s*<\/div>\s*<div className="text-sm font-bold text-\[#1F2937\]">/g,
    'mr-1.5" />Invested</div>\n          <div className="text-sm font-extrabold text-[#1B3A5C]">'
  );

  // For Earned block:
  newContent = newContent.replace(
    /mr-1\.5"(?: \/>|><\/div>)Earned\s*<\/div>\s*<div className="text-sm font-bold text-\[#1F2937\]">/g,
    'mr-1.5" />Earned</div>\n          <div className="text-sm font-extrabold text-[#059669]">'
  );

  // For CAGR Gains Earned block:
  newContent = newContent.replace(
    /mr-1\.5"(?: \/>|><\/div>)Gains Earned\s*<\/div>\s*<div className="text-sm font-bold text-\[#1F2937\]">/g,
    'mr-1.5" />Gains Earned</div>\n          <div className="text-sm font-extrabold text-[#059669]">'
  );
  
  // For Initial Investment block (CAGR):
  newContent = newContent.replace(
    /mr-1\.5"(?: \/>|><\/div>)Initial Investment\s*<\/div>\s*<div className="text-sm font-bold text-\[#1F2937\]">/g,
    'mr-1.5" />Initial Investment</div>\n          <div className="text-sm font-extrabold text-[#1B3A5C]">'
  );

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed', filepath);
  }
}

const files = [
  'src/components/ResultSection.jsx',
  'src/components/TargetResultSection.jsx',
  'src/components/CAGRResultSection.jsx',
  'src/app/lumpsum-calculator/page.js'
];

files.forEach(f => {
  processFile(path.join(__dirname, f));
});
console.log('Done!');
