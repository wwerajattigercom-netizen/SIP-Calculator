const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replacements
            content = content.replace(/bg-\[\#f8f2ea\]/g, 'bg-[var(--background)]');
            content = content.replace(/text-\[\#1F2937\]/g, 'text-[var(--foreground)]');
            content = content.replace(/text-\[\#1B3A5C\]/g, 'text-[var(--color-accent)]');
            content = content.replace(/text-\[\#059669\]/g, 'text-[var(--color-returns)]');
            content = content.replace(/text-\[\#991B1B\]/g, 'text-[var(--color-loss)]');
            
            // For gray text, we want to add dark mode if missing
            // This regex matches `text-gray-500` or `text-gray-600` NOT followed by ` dark:text-gray-400`
            content = content.replace(/text-gray-500(?!\s+dark:text-gray-400)/g, 'text-gray-500 dark:text-gray-400');
            content = content.replace(/text-gray-600(?!\s+dark:text-gray-400)/g, 'text-gray-600 dark:text-gray-400');

            // Handle bg-white specifically inside classNames, avoiding things like text-white
            // This is slightly tricky, so we'll just replace 'bg-white' with 'bg-[var(--panel-bg)]'
            content = content.replace(/bg-white(?!\/)/g, 'bg-[var(--panel-bg)]'); // avoid bg-white/50
            content = content.replace(/border-white(?!\/)/g, 'border-[var(--panel-border)]');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated dark mode classes in ${fullPath}`);
            }
        }
    }
}

processDirectory(rootDir);
console.log("Dark mode migration complete.");
