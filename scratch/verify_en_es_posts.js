const http = require('http');

async function testPost(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        const canonicalMatch = data.match(/<link rel="canonical" href="(.*?)"/);
        const rawHashLinks = data.match(/href="#\/(knowledge|guias|shipping)[^"]*"/g) || [];
        resolve({
          url,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : 'NOT FOUND',
          canonical: canonicalMatch ? canonicalMatch[1] : 'NOT FOUND',
          rawHashCount: rawHashLinks.length
        });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function main() {
  const enRes = await testPost('http://localhost/wordpress_demo/en/knowledge/shipping-guides/preparing-your-shipment/');
  console.log('EN Post:', enRes);

  const esRes = await testPost('http://localhost/wordpress_demo/es/conocimiento/guias-de-envio/preparar-su-envio/');
  console.log('ES Post:', esRes);
}

main();
