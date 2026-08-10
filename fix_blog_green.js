const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Fix the bad buttons in the blog sections
  // Bad Primary Button: bg-[#1B3A5C] hover:bg-[#2563EB] text-[#1F2937]
  newContent = newContent.replace(
    /bg-\[#1B3A5C\] hover:bg-\[#2563EB\] text-\[#1F2937\]/g,
    'bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm'
  );
  // Alternative bad primary: bg-[#2563EB] text-white (leftover from old theme)
  newContent = newContent.replace(
    /bg-\[#2563EB\] hover:bg-blue-700 text-white/g,
    'bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm'
  );

  // Bad Secondary Buttons: text-[#60A5FA] or text-gray-500
  newContent = newContent.replace(
    /border border-\[#1B3A5C\]\/40 text-\[#60A5FA\] hover:border-\[#1B3A5C\]/g,
    'border border-[#1B3A5C]/40 text-[#1B3A5C] hover:border-[#1B3A5C]'
  );
  // Another variant from sip-based-on-salary
  newContent = newContent.replace(
    /border border-\[#1B3A5C\]\/40 text-\[#60A5FA\] hover:bg-\[#1B3A5C\]\/10/g,
    'border border-[#1B3A5C]/40 text-[#1B3A5C] hover:bg-[#1B3A5C]/10'
  );

  // 2. Remove glossiness from CAGR pill
  if (filepath.includes('CAGRResultSection.jsx')) {
    newContent = newContent.replace(
      /boxShadow:\s*`0 0 24px \$\{cagrColor\}33`,\s*/g,
      ''
    );
    // Make border solid and no weird transparency
    newContent = newContent.replace(
      /border:\s*`1\.5px solid \$\{cagrColor\}55`,\s*/g,
      'border: `1.5px solid ${cagrColor}`,'
    );
    // Make background simple cream/white
    newContent = newContent.replace(
      /background:\s*`\$\{cagrColor\}1a`,\s*/g,
      'background: `#FFFFFF`,'
    );
    
    // Make cagrColor always green if positive
    newContent = newContent.replace(
      /const cagrColor =[\s\S]*?'#C4993C';/g,
      "const cagrColor = '#059669';"
    );
  }

  // 3. Change Returns color from Gold (#C4993C) to Green (#059669) globally
  // We used #C4993C for Earned amounts, pie chart segments, dots.
  newContent = replaceAll(newContent, '#C4993C', '#059669');

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
console.log('Done fixing blog links and green returns!');
