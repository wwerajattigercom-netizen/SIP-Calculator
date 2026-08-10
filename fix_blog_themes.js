const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. Red colors: replacing bright red with dark red
  // Hex
  newContent = newContent.replace(/#DC2626/gi, '#991B1B'); // Tailwind red-600 to red-800
  newContent = newContent.replace(/#EF4444/gi, '#991B1B'); // Tailwind red-500 to red-800
  // Tailwind classes
  newContent = replaceAll(newContent, 'text-red-500', 'text-red-800');
  newContent = replaceAll(newContent, 'text-red-600', 'text-red-800');
  newContent = replaceAll(newContent, 'text-red-400', 'text-red-700');
  newContent = replaceAll(newContent, 'bg-red-500', 'bg-red-800');
  newContent = replaceAll(newContent, 'bg-red-600', 'bg-red-800');
  newContent = replaceAll(newContent, 'border-red-500', 'border-red-800');
  newContent = replaceAll(newContent, 'border-red-600', 'border-red-800');
  // RGBA reds (bg-[rgba(220,38,38,0.1)])
  newContent = replaceAll(newContent, '220,38,38', '153,27,27');

  // 2. Background color replacements
  newContent = replaceAll(newContent, 'bg-[#F7EFCA]', 'bg-[#f8f2ea]');
  newContent = replaceAll(newContent, 'bg-[#F5EFEB]', 'bg-[#f8f2ea]');
  newContent = replaceAll(newContent, 'bg-[#F3EBE1]', 'bg-[#f8f2ea]');

  // 3. Ensuring specific element colors on the blog page index
  if (filepath.endsWith('src/app/blog/page.js') || filepath.endsWith('src\\app\\blog\\page.js')) {
    // The "Read Guide" or "Try Calculator" buttons might be blue-on-blue.
    // The previous fix_blog_links.js might have missed some text colors.
    // E.g., `text-[#1B3A5C] bg-[rgba(27,58,92,0.12)]` -> this is a tag color, which is fine.
    
    // We just want to ensure global bg and reds are consistent.
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
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

scanDir(path.join(__dirname, 'src'));
console.log('Done!');
