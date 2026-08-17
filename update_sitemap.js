const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, 'src', 'app', 'sitemap.js');

function getDirs(dir) {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    return files.filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

const inTools = getDirs(path.join(__dirname, 'src', 'app', 'tools')).map(d => `'/tools/${d}'`);
const usTools = getDirs(path.join(__dirname, 'src', 'app', 'us', 'tools')).map(d => `'/us/tools/${d}'`);
const inGuides = getDirs(path.join(__dirname, 'src', 'app', 'blog')).map(d => `'/blog/${d}'`);
const usGuides = getDirs(path.join(__dirname, 'src', 'app', 'us', 'blog')).map(d => `'/us/blog/${d}'`);

let content = fs.readFileSync(sitemapPath, 'utf8');

// Replace arrays
content = content.replace(/const inTools = \[.*?\];/s, `const inTools = [\n    ${inTools.join(',\n    ')}\n  ];`);
content = content.replace(/const usTools = \[.*?\];/s, `const usTools = [\n    ${usTools.join(',\n    ')}\n  ];`);
content = content.replace(/const inGuides = \[.*?\];/s, `const inGuides = [\n    ${inGuides.join(',\n    ')}\n  ];`);
content = content.replace(/const usGuides = \[.*?\];/s, `const usGuides = [\n    ${usGuides.join(',\n    ')}\n  ];`);

fs.writeFileSync(sitemapPath, content);
console.log("sitemap.js updated successfully.");
