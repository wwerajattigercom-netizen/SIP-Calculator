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

    // 1. Replace all 'max-w-4xl mx-auto' with 'w-full' for glass-panels
    content = content.replace(/max-w-4xl\s+mx-auto/g, 'w-full');
    content = content.replace(/max-w-4xl\s+w-full\s+mx-auto/g, 'max-w-6xl w-full mx-auto');

    // 2. Parse and replace the 'How to Use This Calculator' section
    const howToUseRegex = /{\/\*\s*How to Use.*?\*\/}\s*<div[^>]*>\s*<h2[^>]*>How to Use This Calculator<\/h2>\s*<div[^>]*>\s*<(?:ol|ul)[^>]*>([\s\S]*?)<\/(?:ol|ul)>\s*<\/div>\s*<\/div>/i;
    
    // Also try matching without the comment
    const howToUseRegex2 = /<div[^>]*>\s*<h2[^>]*>How to Use This Calculator<\/h2>\s*<div[^>]*>\s*<(?:ol|ul)[^>]*>([\s\S]*?)<\/(?:ol|ul)>\s*<\/div>\s*<\/div>/i;

    let match = content.match(howToUseRegex) || content.match(howToUseRegex2);
    
    if (match) {
        const listItemsText = match[1];
        const liRegex = /<li>\s*(?:<strong>)?(.*?)(?:<\/strong>)?:\s*(.*?)<\/li>/gi;
        
        let steps = [];
        let liMatch;
        let stepCount = 1;
        while ((liMatch = liRegex.exec(listItemsText)) !== null) {
            steps.push({
                step: stepCount++,
                title: liMatch[1].trim().replace(/<\/?strong>/g, ''),
                desc: liMatch[2].trim()
            });
        }
        
        if (steps.length === 0) {
            // fallback if colon isn't used
            const fallbackRegex = /<li>([\s\S]*?)<\/li>/gi;
            stepCount = 1;
            while ((liMatch = fallbackRegex.exec(listItemsText)) !== null) {
                let text = liMatch[1].replace(/<[^>]+>/g, '').trim();
                let parts = text.split(':');
                if (parts.length > 1) {
                    steps.push({ step: stepCount++, title: parts[0].trim(), desc: parts.slice(1).join(':').trim() });
                } else {
                    steps.push({ step: stepCount++, title: `Step ${stepCount-1}`, desc: text });
                }
            }
        }

        if (steps.length > 0) {
            let gridHtml = `
        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`;
            
            for (const s of steps) {
                gridHtml += `
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                ${s.step}
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">${s.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">${s.desc}</p>
              </div>
            </div>`;
            }
            gridHtml += `
          </div>
        </section>`;

            content = content.replace(match[0], gridHtml);
            
            // Need to ensure Info icon is imported if it isn't already
            if (!content.includes('Info,') && !content.includes(', Info') && !content.includes('{ Info }')) {
                content = content.replace(/import {([^}]+)} from 'lucide-react';/, (m, p1) => {
                    return `import { ${p1.trim()}, Info } from 'lucide-react';`;
                });
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
