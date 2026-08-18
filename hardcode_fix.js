const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'src', 'app', 'tools'),
    path.join(__dirname, 'src', 'app', 'us', 'tools')
];

let modifiedCount = 0;

const gridHtml = `
        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Adjust the inputs</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Use the sliders or text boxes to enter your specific financial numbers.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Review the charts</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Analyze the results</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</p>
              </div>
            </div>
          </div>
        </section>`;

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

    const regex1 = /{\/\*\s*How to Use.*?\*\/}\s*<div[^>]*>[\s\S]*?<ol[^>]*list-decimal[^>]*>[\s\S]*?<\/ol>\s*<\/div>/i;
    content = content.replace(regex1, gridHtml);

    const regex2 = /<section[^>]*id="how-to-use"[^>]*>[\s\S]*?<ol[^>]*list-decimal[^>]*>[\s\S]*?<\/ol>\s*<\/section>/i;
    content = content.replace(regex2, gridHtml);

    const regex3 = /<div[^>]*>\s*<h2[^>]*>[\s\S]*?How to Use This Calculator[\s\S]*?<\/h2>\s*<ol[^>]*list-decimal[^>]*>[\s\S]*?<\/ol>\s*<\/div>/i;
    content = content.replace(regex3, gridHtml);

    if (content !== original) {
        if (!content.includes('Info,') && !content.includes(', Info') && !content.includes('{ Info }') && content.includes('<Info ')) {
            content = content.replace(/import {([^}]+)} from 'lucide-react';/, (m, p1) => {
                return `import { ${p1.trim()}, Info } from 'lucide-react';`;
            });
        }
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Modified: ${filePath}`);
        modifiedCount++;
    }
}

for (const dir of dirsToScan) {
    processDirectory(dir);
}
console.log(`Done! Modified ${modifiedCount} files.`);
