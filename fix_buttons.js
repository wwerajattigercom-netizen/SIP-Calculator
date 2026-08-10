const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Fix Email Button
  // Original patterns vary slightly (some have text-xs, some text-sm)
  newContent = newContent.replace(
    /className="inline-flex items-center gap-2 bg-\[#1B3A5C\] bg-opacity-20 border border-\[#1B3A5C\] hover:bg-opacity-30 transition-all text-\[#6B7280\] px-5 py-2\.5 rounded-xl text-(xs|sm) font-medium"/g,
    'className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white hover:bg-[#112740] transition-all px-5 py-2.5 rounded-xl text-$1 font-medium shadow-sm"'
  );

  // 2. Fix the "R" avatar circle
  newContent = newContent.replace(
    /className="w-12 h-12 rounded-full bg-\[#1B3A5C\] bg-opacity-20 border-2 border-\[#1B3A5C\] flex items-center justify-center mx-auto mb-3 text-lg font-bold text-\[#6B7280\]"/g,
    'className="w-12 h-12 rounded-full bg-[#1B3A5C] flex items-center justify-center mx-auto mb-3 text-lg font-bold text-white shadow-sm"'
  );

  // 3. Fix the "Built by Rajat" gradient
  newContent = newContent.replace(
    /<span className="text-gradient font-bold text-sm">Rajat<\/span>/g,
    '<span className="text-[#1B3A5C] font-bold text-sm">Rajat</span>'
  );

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed buttons in', filepath);
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
console.log('Done fixing buttons!');
