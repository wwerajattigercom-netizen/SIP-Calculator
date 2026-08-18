const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'src', 'app', 'tools'),
    path.join(__dirname, 'src', 'app', 'us', 'tools')
];

let modifiedCount = 0;

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.isFile() && entry.name === 'page.js') {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed"><\/strong>\s*/g, '<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">');
    content = content.replace(/<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed"><strong>\s*/g, '<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">');
    content = content.replace(/<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed"><\/strong>/g, '<p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">');
    content = content.replace(/<\/strong><\/strong>/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Modified: ${filePath}`);
        modifiedCount++;
    }
}

for (const dir of dirsToScan) {
    processDirectory(dir);
}
console.log(`Done! Modified ${modifiedCount} files.`);
