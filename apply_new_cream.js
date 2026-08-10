const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Replace background var in globals.css
  if (filepath.endsWith('globals.css')) {
    newContent = newContent.replace(/--background:\s*#[0-9A-Fa-f]{6};/, '--background:   #F7EFCA;');
  }

  // Replace utility classes
  newContent = replaceAll(newContent, 'bg-[#F5EFEB]', 'bg-[#F7EFCA]');
  newContent = replaceAll(newContent, 'bg-[#F3EBE1]', 'bg-[#F7EFCA]');

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
