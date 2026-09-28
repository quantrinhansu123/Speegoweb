const http = require('http');

http.get('http://localhost/wordpress_demo/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    const canonicalMatch = data.match(/<link rel="canonical" href="(.*?)"/);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');
    const prerenderMatch = data.match(/data-speego-prerendered-route="(.*?)"/);
    console.log('Prerendered Route:', prerenderMatch ? prerenderMatch[1] : 'NOT FOUND');

    // Check if there are any raw "#/knowledge" links in the HTML
    const rawHashLinks = data.match(/href="#\/knowledge[^"]*"/g) || [];
    console.log('Raw href="#/knowledge..." count:', rawHashLinks.length);
    if (rawHashLinks.length > 0) {
      console.log('Sample raw hash links:', rawHashLinks.slice(0, 5));
    }

    // Check if there are clean links
    const cleanLinks = data.match(/href="[^"]*\/kien-thuc\/[^"]*"/g) || [];
    console.log('Clean /kien-thuc/ links count:', cleanLinks.length);
    if (cleanLinks.length > 0) {
      console.log('Sample clean links:', cleanLinks.slice(0, 5));
    }
  });
}).on('error', err => console.error(err));
