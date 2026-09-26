const fs = require('fs');

const c = fs.readFileSync('D:/Speegoweb/scratch/vi_home_sections.html', 'utf8');
const start = c.indexOf('id="process-speego"');
const end = c.indexOf('</section>', start);
console.log(c.substring(start - 20, end + 10));
