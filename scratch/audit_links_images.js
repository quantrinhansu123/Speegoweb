const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.php')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir('explore');

console.log('=== Checking href attributes starting with / ===');
files.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const hrefs = text.match(/href=["'](\/[^"']*)["']/g);
  if (hrefs) {
    console.log(f, hrefs);
  }
});

console.log('\n=== Checking image src attributes ===');
const missingImages = [];
files.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const imgs = text.match(/src=["']([^"']+\.(?:png|jpg|jpeg|svg|webp|gif))["']/g) || [];
  imgs.forEach(m => {
    const src = m.replace(/src=["']/, '').replace(/["']$/, '');
    if (src.startsWith('http') || src.startsWith('data:')) return;
    const resolvedPath = path.resolve('explore', src);
    if (!fs.existsSync(resolvedPath)) {
      missingImages.push({ file: f, src, resolvedPath });
    }
  });
});

console.log('Missing images count:', missingImages.length);
missingImages.forEach(m => console.log('File:', m.file, '-> Missing src:', m.src));
