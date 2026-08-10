const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Let's specifically target the text color of the Earned/Gains section.
  
  // In ResultSection.jsx
  if (filepath.endsWith('ResultSection.jsx')) {
    newContent = newContent.replace(
      /<div className="w-2 h-2 rounded-full bg-\[#C4993C\] mr-1\.5"><\/div>\s*Earned\s*<\/div>\s*<div className="text-sm font-bold text-\[#[a-zA-Z0-9]+\]">/g,
      '<div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5"></div>\n            Earned\n          </div>\n          <div className="text-sm font-extrabold text-[#059669]">'
    );
  }

  // In TargetResultSection.jsx
  if (filepath.endsWith('TargetResultSection.jsx')) {
    newContent = newContent.replace(
      /<div className="w-2 h-2 rounded-full bg-\[#C4993C\] mr-1\.5"><\/div>\s*Gains Earned\s*<\/div>\s*<div className="text-sm font-bold text-\[#[a-zA-Z0-9]+\]">/g,
      '<div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5"></div>\n            Gains Earned\n          </div>\n          <div className="text-sm font-extrabold text-[#059669]">'
    );
  }

  // In CAGRResultSection.jsx
  if (filepath.endsWith('CAGRResultSection.jsx')) {
    newContent = newContent.replace(
      /<div className="w-2 h-2 rounded-full bg-\[#C4993C\] mr-1\.5"><\/div>\s*Gains Earned\s*<\/div>\s*<div className="text-sm font-bold text-\[#[a-zA-Z0-9]+\]">/g,
      '<div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5"></div>\n            Gains Earned\n          </div>\n          <div className="text-sm font-extrabold text-[#059669]">'
    );
  }

  // In lumpsum-calculator/page.js
  if (filepath.endsWith('page.js') && filepath.includes('lumpsum-calculator')) {
    newContent = newContent.replace(
      /<div className="w-2 h-2 rounded-full bg-\[#C4993C\] mr-1\.5"><\/div>\s*Est\. Returns\s*<\/div>\s*<div className="text-sm font-bold text-\[#[a-zA-Z0-9]+\]">/g,
      '<div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5"></div>\n                    Est. Returns\n                  </div>\n                  <div className="text-sm font-extrabold text-[#059669]">'
    );
  }

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
