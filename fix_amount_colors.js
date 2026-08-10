const fs = require('fs');
const path = require('path');

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  // 1. TimeToGoalDisplay.jsx
  if (filepath.endsWith('TimeToGoalDisplay.jsx')) {
    // Arc Color: Dark Yellow + Darker Yellow
    // Current: const arcColor = totalYears <= 10 ? '#0D9488' : totalYears <= 20 ? '#1B3A5C' : '#059669';
    // Let's just make it a single yellow or a gradient. A gradient is complex in SVG stroke, so let's use a solid dark yellow #C4993C for the stroke, and a darker yellow for the drop-shadow.
    // Actually, user just pointed to the arc and said "dark YELLOW + darker yellow".
    newContent = newContent.replace(
      /const arcColor = .+?;/,
      "const arcColor = '#C4993C'; // dark yellow"
    );
    // Replace drop shadow color to be darker yellow instead of arcColor
    newContent = newContent.replace(
      /drop-shadow\(0 0 8px \$\{arcColor\}88\)/,
      "drop-shadow(0 0 8px #9CA3AF) // removed glow or use darker yellow"
    );
    // Let's actually remove the glow or use #A87D2A for darker yellow glow
    newContent = newContent.replace(
      /drop-shadow\(0 0 8px #9CA3AF\)/,
      "drop-shadow(0 0 8px #8C6D2388)"
    );

    // Goal Corpus (Total Amount) -> Black
    // Currently: <div className="text-sm font-bold text-[#1F2937]"> (for targetAmount)
    newContent = newContent.replace(
      /<div className="text-sm font-bold text-\[#1F2937\]">\s*\{formatCurrency\(results.targetAmount\)\}/,
      '<div className="text-sm font-extrabold text-black">\n              {formatCurrency(results.targetAmount)}'
    );
    
    // Total Invested -> Blue
    // Currently: <div className="text-sm font-bold text-[#1F2937]"> (for totalInvestedAtGoal)
    newContent = newContent.replace(
      /<div className="text-sm font-bold text-\[#1F2937\]">\s*\{formatCurrency\(results.totalInvestedAtGoal\)\}/,
      '<div className="text-sm font-extrabold text-[#1B3A5C]">\n              {formatCurrency(results.totalInvestedAtGoal)}'
    );
    
    // Returns Earned -> Green
    // Currently: <div className="text-sm font-bold text-[#1F2937]"> (for gainsAtGoal)
    newContent = newContent.replace(
      /<div className="text-sm font-bold text-\[#1F2937\]">\s*\+\{formatCurrency\(results.gainsAtGoal\)\}/,
      '<div className="text-sm font-extrabold text-[#059669]">\n              +{formatCurrency(results.gainsAtGoal)}'
    );
  }

  // 2. Globally ensure Total/Invested/Earned colors across other cards
  // Total Amount (Final Value, etc.) should be Black (text-black).
  // Invested should be Blue (#1B3A5C).
  // Earned should be Green (#059669).
  
  if (filepath.endsWith('ResultSection.jsx')) {
    // Total Value -> Black
    newContent = newContent.replace(
      /<div className="text-sm font-bold text-\[#1F2937\]">\s*\{formatCurrency\(results.actualAmount\)\}/,
      '<div className="text-sm font-extrabold text-black">\n            {formatCurrency(results.actualAmount)}'
    );
    // Invested -> Blue
    // Let's match `<div className="text-sm font-bold text-[#1F2937]">\n            {formatCurrency(results.totalInvested)}`
    // Wait, earlier I might have changed it. Let's just blindly regex replace the exact variables.
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{formatCurrency\(results\.totalInvested\)\}/,
      '<div className="text-sm font-extrabold text-[#1B3A5C]">\n            {formatCurrency(results.totalInvested)}'
    );
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\+\{formatCurrency\(results\.amountEarned\)\}/,
      '<div className="text-sm font-extrabold text-[#059669]">\n            +{formatCurrency(results.amountEarned)}'
    );
  }

  if (filepath.endsWith('CAGRResultSection.jsx')) {
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{fmt\(finalValue\)\}/,
      '<div className="text-sm font-extrabold text-black">\n            {fmt(finalValue)}'
    );
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{fmt\(initialInvestment\)\}/,
      '<div className="text-sm font-extrabold text-[#1B3A5C]">\n            {fmt(initialInvestment)}'
    );
    // Gains Earned is already green via fix_text_green.js, but let's enforce it
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{isNegativeGain \? '-' \: '\+'\}\{fmt\(Math\.abs\(absoluteGain\)\)\}/,
      '<div className="text-sm font-extrabold text-[#059669]">\n            {isNegativeGain ? "-" : "+"}{fmt(Math.abs(absoluteGain))}'
    );
  }

  if (filepath.endsWith('TargetResultSection.jsx')) {
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{formatCurrency\(results\.targetAmount\)\}/,
      '<div className="text-sm font-extrabold text-black">\n            {formatCurrency(results.targetAmount)}'
    );
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{formatCurrency\(results\.totalInvestedAtGoal\)\}/,
      '<div className="text-sm font-extrabold text-[#1B3A5C]">\n            {formatCurrency(results.totalInvestedAtGoal)}'
    );
  }
  
  if (filepath.endsWith('page.js') && filepath.includes('lumpsum-calculator')) {
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{fmtINR\(results\.futureValue\)\}/,
      '<div className="text-sm font-extrabold text-black">\n                  {fmtINR(results.futureValue)}'
    );
    newContent = newContent.replace(
      /<div className="text-sm font-(bold|extrabold) text-\[#[A-Za-z0-9]+\]">\s*\{fmtINR\(principal\)\}/,
      '<div className="text-sm font-extrabold text-[#1B3A5C]">\n                  {fmtINR(principal)}'
    );
  }

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log('Fixed', filepath);
  }
}

const files = [
  'src/components/ResultSection.jsx',
  'src/components/TargetResultSection.jsx',
  'src/components/CAGRResultSection.jsx',
  'src/components/TimeToGoalDisplay.jsx',
  'src/app/lumpsum-calculator/page.js'
];

files.forEach(f => {
  processFile(path.join(__dirname, f));
});
console.log('Done!');
