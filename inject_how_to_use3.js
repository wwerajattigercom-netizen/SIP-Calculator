const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src', 'app');

const howToUseBlock = `          {/* How to Use */}
          <div className="glass-panel p-6 mt-8 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> How to Use This Calculator
            </h2>
            <ol className="list-decimal ml-5 space-y-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
                  <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
                  <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
            </ol>
          </div>

          {/* FAQ */}`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file === 'page.js') {
            let content = fs.readFileSync(fullPath, 'utf8');

            if (content.includes('{/* FAQ */}') && !content.includes('How to Use This Calculator') && !content.includes('How to Use ──')) {
                const match = content.match(/^([ \t]*)\{\/\* FAQ \*\/\}/m);
                if (match) {
                    const indent = match[1];
                    const indentedBlock = howToUseBlock.split('\n').map((line, i) => i === 0 ? line.trimStart() : (line ? indent + line.trimStart() : '')).join('\n');
                    
                    content = content.replace(/^([ \t]*)\{\/\* FAQ \*\/\}/m, indent + indentedBlock);
                    fs.writeFileSync(fullPath, content);
                    console.log(`Injected into ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(rootDir);
console.log("Done phase 3.");
