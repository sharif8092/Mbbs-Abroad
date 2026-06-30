import fs from 'fs';

let content = fs.readFileSync('src/data/universities.ts', 'utf-8');

// Replace Samarkand
content = content.replace(
  /(name:\s*['"]Samarkand State Medical University['"][\s\S]*?image:\s*['"])([^'"]+)(['"])/,
  `$1/universities/samarkand.jpg$3`
);

// Replace KSMA
content = content.replace(
  /(name:\s*['"]Kyrgyz State Medical Academy \(KSMA\)['"][\s\S]*?image:\s*['"])([^'"]+)(['"])/,
  `$1/universities/ksma.jpg$3`
);

fs.writeFileSync('src/data/universities.ts', content, 'utf-8');
console.log('Fixed Samarkand and KSMA images.');
