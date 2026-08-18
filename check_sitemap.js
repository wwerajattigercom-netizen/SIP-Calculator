const fs = require('fs');
const path = require('path');

// Execute the sitemap generation logic from sitemap.js
const { execSync } = require('child_process');

// 1. Get all page.js files
function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (name.endsWith('page.js')) {
        files_.push(name);
      }
    }
  }
  return files_;
}

const appDir = path.join(__dirname, 'src', 'app');
const allPages = getFiles(appDir);

// Convert file paths to route paths
let actualRoutes = allPages.map(p => {
  let route = p.replace(appDir, '').replace(/\\/g, '/').replace('/page.js', '');
  if (route === '') route = '/';
  return route;
});

// 2. Extract routes from sitemap.js
const sitemapContent = fs.readFileSync(path.join(appDir, 'sitemap.js'), 'utf8');

// Simple regex to find all strings starting with /
const sitemapRoutes = [];
const matches = sitemapContent.match(/'\/[^']*'/g);
if (matches) {
  matches.forEach(m => {
    sitemapRoutes.push(m.replace(/'/g, ''));
  });
}
// don't forget root
sitemapRoutes.push('/');

const missingInSitemap = actualRoutes.filter(r => !sitemapRoutes.includes(r));
const missingInFiles = sitemapRoutes.filter(r => !actualRoutes.includes(r));

console.log("Total Actual Routes:", actualRoutes.length);
console.log("Total Sitemap Routes (hardcoded):", sitemapRoutes.length);

console.log("\\n--- Routes Missing from Sitemap ---");
missingInSitemap.forEach(r => console.log(r));

console.log("\\n--- Routes in Sitemap but no page.js exists ---");
missingInFiles.forEach(r => console.log(r));
