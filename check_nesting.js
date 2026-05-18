const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = [...walk('app'), ...walk('components')];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // simplistic approach: find all <p>...</p> tags
  const regex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
      if (match[1].toLowerCase().includes('<div')) {
          console.log(`\nFound <div> inside <p> in file: ${file}`);
          console.log(match[0].substring(0, 200) + '...');
      }
  }
}
