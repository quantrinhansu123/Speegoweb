const http = require('http');

const urls = [
  'http://localhost/wordpress_demo/vi/knowledge/',
  'http://localhost/wordpress_demo/en/knowledge/',
  'http://localhost/wordpress_demo/es/knowledge/',
  'http://localhost/wordpress_demo/vi/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  'http://localhost/wordpress_demo/en/shipping-guides/preparing-your-shipment/',
  'http://localhost/wordpress_demo/es/guias-de-envio/preparar-su-envio/',
  'http://localhost/wordpress_demo/vi/tim-nguon-hang/',
  'http://localhost/wordpress_demo/vi/knowledge/sourcing-qc/',
  'http://localhost/wordpress_demo/vi/sourcing-qc/kiem-soat-chat-luong/'
];

function fetchPage(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, status: res.statusCode, html: data }));
    }).on('error', err => resolve({ url, status: 'ERR', error: err.message }));
  });
}

async function main() {
  for (const u of urls) {
    const res = await fetchPage(u);
    console.log(`\n========================================`);
    console.log(`URL: ${res.url} (${res.status})`);
    if (res.html) {
      const title = res.html.match(/<title>([^<]*)<\/title>/i)?.[1];
      const desc = res.html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1];
      const canonical = res.html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1];
      const alternates = [...res.html.matchAll(/<link\s+rel=["']alternate["'][^>]*>/gi)].map(m => m[0]);
      const appMainHasContent = res.html.includes('id="app-main"') && res.html.match(/<main\b[^>]*id=["']app-main["'][^>]*>([\s\S]*?)<\/main>/i)?.[1]?.trim().length > 100;
      
      console.log(`Title: ${title}`);
      console.log(`Description: ${desc}`);
      console.log(`Canonical: ${canonical}`);
      console.log(`Alternates (${alternates.length}):`);
      alternates.forEach(a => console.log('  ' + a));
      console.log(`Main Content Rendered: ${appMainHasContent}`);
    }
  }
}

main();
