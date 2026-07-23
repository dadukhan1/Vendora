const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { search: /#0F52FF/gi, replace: '#F59E0B' }, // Blue to Amber
  { search: /#F8FAFC/gi, replace: '#FAFAF9' }, // Cool grey to warm stone
  { search: /#0F172A/gi, replace: '#1F2937' }, // Dark slate to rich charcoal
  { search: /bg-blue-50/gi, replace: 'bg-amber-50' },
  { search: /bg-blue-100/gi, replace: 'bg-amber-100' },
  { search: /bg-blue-500/gi, replace: 'bg-amber-500' },
  { search: /bg-blue-600/gi, replace: 'bg-amber-600' },
  { search: /text-blue-500/gi, replace: 'text-amber-500' },
  { search: /text-blue-600/gi, replace: 'text-amber-600' },
  { search: /text-blue-50/gi, replace: 'text-amber-50' },
  { search: /border-blue-500/gi, replace: 'border-amber-500' },
  { search: /border-blue-200/gi, replace: 'border-amber-200' },
  { search: /shadow-blue-100/gi, replace: 'shadow-amber-100' },
  { search: /hover:bg-blue-50/gi, replace: 'hover:bg-amber-50' },
  { search: /hover:bg-blue-100/gi, replace: 'hover:bg-amber-100' },
  { search: /hover:text-blue-600/gi, replace: 'hover:text-amber-600' },
];

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      replacements.forEach(r => {
        if (content.match(r.search)) {
          content = content.replace(r.search, r.replace);
          modified = true;
        }
      });
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Modified:', fullPath);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Done replacement.');
