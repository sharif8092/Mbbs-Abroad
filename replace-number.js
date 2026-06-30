import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  content = content.replace(/917909096738/g, '918521123304');
  content = content.replace(/\+917909096738/g, '+918521123304');
  content = content.replace(/\+91 79090 96738/g, '+91 85211 23304');
  content = content.replace(/\+91-79090-96738/g, '+91-85211-23304');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated: ' + filePath);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir('./src');
console.log('Done replacing numbers!');
