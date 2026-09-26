const fs = require('fs');
const html = fs.readFileSync('scratch/vi_home_sections.html', 'utf8');

const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["']/g) || [];
console.log('Images in vi_home_sections.html:');
imgMatches.forEach(m => console.log(' ', m));

const posterMatches = html.match(/poster=["']([^"']+)["']/g) || [];
console.log('Posters:');
posterMatches.forEach(m => console.log(' ', m));

const bgMatches = html.match(/background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)/g) || [];
console.log('Background URLs:');
bgMatches.forEach(m => console.log(' ', m));
