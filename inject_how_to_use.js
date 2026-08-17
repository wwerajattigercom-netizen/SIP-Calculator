const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src', 'app');

const howToUseBlock = `      {/* How to Use Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-6">How to Use This Calculator</h2>
          <div className="space-y-4 text-[#6B7280] leading-relaxed">
              <ol className="list-decimal ml-5 space-y-3">
                  <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
                  <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
                  <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
              </ol>
          </div>
      </div>

      {/* FAQ Section */}`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file === 'page.js') {
            let content = fs.readFileSync(fullPath, 'utf8');

            if (content.includes('{/* FAQ Section */}') && !content.includes('How to Use This Calculator')) {
                // Determine indentation
                const match = content.match(/^([ \t]*)\{\/\* FAQ Section \*\/\}/m);
                if (match) {
                    const indent = match[1];
                    const indentedBlock = howToUseBlock.split('\n').map((line, i) => i === 0 ? line.trimStart() : (line ? indent + line.trimStart() : '')).join('\n');
                    
                    content = content.replace(/^([ \t]*)\{\/\* FAQ Section \*\/\}/m, indent + indentedBlock);
                    fs.writeFileSync(fullPath, content);
                    console.log(`Injected into ${fullPath}`);
                } else {
                    console.log(`Could not find indented FAQ Section in ${fullPath}`);
                }
            } else {
                if (content.includes('How to Use This Calculator')) {
                    console.log(`Already contains How to Use: ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(rootDir);
console.log("Done.");
