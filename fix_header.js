const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'components', 'Header.jsx');
let content = fs.readFileSync(file, 'utf8');

// Remove hardcoded bright blue hovers
content = content.replaceAll('dark:hover:text-[#3B82F6]', '');
// Fix any double spaces caused by the removal
content = content.replaceAll('  ', ' ');

fs.writeFileSync(file, content);
console.log('Fixed Header.jsx');
