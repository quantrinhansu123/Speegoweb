const fs = require('fs');

const c = fs.readFileSync('D:/Speegoweb/public/vi/index.html', 'utf8');
const scripts = [...c.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total scripts:', scripts.length);
scripts.forEach((s, idx) => {
  const src = s[0].match(/src="([^"]+)"/);
  console.log('Script', idx, src ? src[1] : 'inline: ' + s[1].substring(0, 100).replace(/\s+/g, ' '));
});
