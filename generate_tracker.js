const fs = require('fs');
const path = require('path');

function getDirs(srcpath) {
    if (!fs.existsSync(srcpath)) return [];
    return fs.readdirSync(srcpath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

const inTools = getDirs(path.join(__dirname, 'src', 'app', 'tools'));
const usTools = getDirs(path.join(__dirname, 'src', 'app', 'us', 'tools'));
const inBlog = getDirs(path.join(__dirname, 'src', 'app', 'blog'));
const usBlog = getDirs(path.join(__dirname, 'src', 'app', 'us', 'blog'));

let md = `# Content & Topic Tracker

> **Purpose:** This file tracks all the calculators and educational guides that currently exist on StepupCalculator. AI Agents MUST read this file before brainstorming or researching new topics to prevent any duplicate content generation.

## 🧮 1. Calculators
_These are interactive tools that perform calculations._

### Indian Region (\`/tools/*\`)
${inTools.map(t => `- [x] ${t}`).join('\n')}

### US Region (\`/us/tools/*\`)
${usTools.map(t => `- [x] ${t}`).join('\n')}
- [x] MAIN: dca-calculator (mapped to /us)

## 📚 2. Educational Guides / Blogs
_These are reading materials and concepts._

### Indian Region (\`/blog/*\`)
${inBlog.map(t => `- [x] ${t}`).join('\n')}

### US Region (\`/us/blog/*\`)
${usBlog.map(t => `- [x] ${t}`).join('\n')}

## 🎯 3. Core Themes Covered
- SIP vs Lumpsum / DCA vs Lumpsum
- Real Returns (Inflation adjustment)
- Goal Planning (1 Crore, Child Education, House Down Payment)
- Retirement Planning (FIRE, NPS, PPF, 401(k), Roth IRA)
- Financial Formulas (XIRR, CAGR, Absolute Returns)
- Market Crashes (Cost of stopping SIP/DCA)
- Rules of Thumb (50-30-20 Rule / Salary-based investing)
- Rent vs Buy 
`;

fs.writeFileSync(path.join(__dirname, 'CONTENT_TRACKER.md'), md, 'utf8');
console.log('Created CONTENT_TRACKER.md');
