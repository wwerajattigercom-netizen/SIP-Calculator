const fs = require('fs');
const path = require('path');

const inBlogPath = path.join(__dirname, 'src', 'app', 'blog', 'page.js');
const usBlogPath = path.join(__dirname, 'src', 'app', 'us', 'blog', 'page.js');

function refactorBlogPage(filePath, isUs) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Add TOOL_HREFS
  const toolHrefsIn = `
const TOOL_HREFS = [
  '/blog/sip-vs-fd-ppf-rd',
  '/blog/cost-of-delay-calculator',
  '/blog/sip-based-on-salary',
  '/blog/retirement-sip-calculator',
  '/blog/sip-vs-lumpsum',
  '/blog/sip-to-beat-inflation',
  '/blog/sip-during-market-crash',
  '/blog/sip-to-reach-1-crore',
  '/blog/sip-for-child-education',
  '/blog/sip-for-house-down-payment'
];
`;
  const toolHrefsUs = `
const TOOL_HREFS = [
  '/us/blog/dca-vs-fd-ppf-rd',
  '/us/blog/cost-of-delay-calculator',
  '/us/blog/dca-based-on-salary',
  '/us/blog/retirement-dca-calculator',
  '/us/blog/dca-vs-lumpsum',
  '/us/blog/dca-to-beat-inflation',
  '/us/blog/dca-during-market-crash',
  '/us/blog/dca-to-reach-1-million',
  '/us/blog/dca-for-child-education',
  '/us/blog/dca-for-house-down-payment'
];
`;
  
  const toolHrefs = isUs ? toolHrefsUs : toolHrefsIn;
  
  if (!content.includes('const TOOL_HREFS')) {
    content = content.replace('export default function BlogIndexPage() {', toolHrefs + '\nexport default function BlogIndexPage() {');
  }

  // 2. Add tools and guides arrays inside the component
  const filterLogic = `
  const tools = ARTICLES.filter(a => TOOL_HREFS.includes(a.href));
  const guides = ARTICLES.filter(a => !TOOL_HREFS.includes(a.href));
  `;
  if (!content.includes('const tools = ARTICLES.filter')) {
    content = content.replace('export default function BlogIndexPage() {', 'export default function BlogIndexPage() {' + filterLogic);
  }

  // 3. Extract the card JSX to a component (if not already extracted)
  // Or just duplicate the map block. Duplicating is easier to regex.
  
  const mapBlockRegex = /<h2 className="text-xl font-bold text-foreground px-1 mb-4">All Guides<\/h2>\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">\s*\{ARTICLES\.map\(\(\{ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor \}\) => \([\s\S]*?\}\)\)\}\s*<\/div>/;
  
  const match = content.match(mapBlockRegex);
  if (match) {
    const originalBlock = match[0];
    
    // Extract just the mapping inner code
    const mapInnerMatch = originalBlock.match(/\{ARTICLES\.map\(\(\{ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor \}\) => \(([\s\S]*?)\)\)\}/);
    
    if (mapInnerMatch) {
      const cardJsx = mapInnerMatch[1];
      
      const newBlock = `
          <h2 className="text-xl font-bold text-foreground px-1 mb-4">Interactive Tools & Simulators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12">
            {tools.map(({ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor }) => (
              ${cardJsx}
            ))}
          </div>
          
          <h2 className="text-xl font-bold text-foreground px-1 mb-4">Educational Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {guides.map(({ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor }) => (
              ${cardJsx}
            ))}
          </div>
`;
      content = content.replace(originalBlock, newBlock);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

refactorBlogPage(inBlogPath, false);
refactorBlogPage(usBlogPath, true);
console.log('Blog pages refactored.');
