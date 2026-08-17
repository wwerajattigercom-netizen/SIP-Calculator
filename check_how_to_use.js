const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src', 'app');

function checkDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            checkDirectory(fullPath);
        } else if (file === 'page.js') {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Only care about calculators, which typically have 'Calculator' in the path or use 'InputSlider'
            if (content.includes('InputSlider') && !content.includes('How to Use This Calculator') && !content.includes('How to Use ──')) {
                console.log(`Missing How To Use: ${fullPath}`);
            }
        }
    }
}

checkDirectory(rootDir);
console.log("Done checking.");
