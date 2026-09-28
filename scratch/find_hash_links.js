const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.html')) results.push(full);
  });
  return results;
}

const files = walk('explore/pages');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/href=["'](#[^"']*)["']/g);
  if (matches) {
    const hashMatches = matches.filter(m => m.includes('#/'));
    if (hashMatches.length > 0) {
      console.log(f + ': ' + hashMatches.join(', '));
    }
  }
});
