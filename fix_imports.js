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

    if (content.includes('<Info ')) {
        // Check if Info is already imported
        const hasInfoImport = /import\s+{([^}]*)\bInfo\b([^}]*)}\s+from\s+['"]lucide-react['"]/m.test(content);
        
        if (!hasInfoImport) {
            // Find the lucide-react import
            const lucideImportRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/m;
            let match = content.match(lucideImportRegex);
            
            if (match) {
                // Add Info to the existing import
                const newImport = match[0].replace(/}/, ', Info }');
                content = content.replace(lucideImportRegex, newImport);
            } else {
                // Add a new import at the top
                // find first import
                content = content.replace(/import /, "import { Info } from 'lucide-react';\nimport ");
            }
        }
    }

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
