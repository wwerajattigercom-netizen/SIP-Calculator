const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // Fix the invisible text in sip-for-child-education banner
  newContent = replaceAll(newContent, 'text-amber-200/80', 'text-[#1F2937]');
  
  // Fix the dark text on blue background buttons across the site
  // Old: bg-[#1B3A5C] hover:bg-[#7c3aed] text-[#1F2937]
  // New: bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm
  newContent = replaceAll(newContent, 'bg-[#1B3A5C] hover:bg-[#7c3aed] text-[#1F2937]', 'bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm');
  
  // Just in case there are variations without the hover state
  // We want to make sure we don't accidentally replace text colors on things that SHOULD be blue text on transparent bg, 
  // but the user said: "Wherever there is a blue background there should be white text."
  // Wait, what if it's `bg-[#1B3A5C] bg-opacity-20`? In that case we want dark text.
  // The grep search showed only exact matches for `bg-[#1B3A5C]` that had `text-[#1F2937]`, which is what I just fixed.
  // Wait, I should also fix any stray `bg-[#1B3A5C]` that has `text-black` or `text-gray-800`.
  // Let's use a regex to find `<* bg-[#1B3A5C] * text-[#1F2937]`?
  // Let's manually check if any other buttons were missed.
  
  // Checking for `bg-[#1B3A5C]` but missing `text-white`
  // Actually the previous grep search output listed all matches for `bg-[#1B3A5C]`.
  // Let's review the grep output from earlier to be absolutely sure.
  
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
