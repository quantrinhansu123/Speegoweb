const fs = require('fs');
const path = require('path');

const routeMap = JSON.parse(fs.readFileSync('route-map.json', 'utf8'));
const pages = routeMap.pages;

// Mapping of hash routes to clean relative paths
const hashToCleanUrl = {};
for (const [hash, def] of Object.entries(pages)) {
  hashToCleanUrl[hash] = def.path;
}

// Additional legacy / alternative hash patterns
hashToCleanUrl['#/home'] = '/vi/';
hashToCleanUrl['#/en/home'] = '/en/';
hashToCleanUrl['#/es/inicio'] = '/es/';
hashToCleanUrl['#/about-us'] = '/vi/ve-chung-toi/';
hashToCleanUrl['#/en/about-us'] = '/en/about-us/';
hashToCleanUrl['#/es/about-us'] = '/es/sobre-nosotros/';
hashToCleanUrl['#/sourcing'] = '/vi/tim-nguon-hang/';
hashToCleanUrl['#/en/sourcing'] = '/en/sourcing/';
hashToCleanUrl['#/es/sourcing'] = '/es/abastecimiento/';
hashToCleanUrl['#/fulfillment'] = '/vi/fulfillment/';
hashToCleanUrl['#/en/fulfillment'] = '/en/fulfillment/';
hashToCleanUrl['#/es/fulfillment'] = '/es/fulfillment/';
hashToCleanUrl['#/xuat-nhap-khau'] = '/vi/xuat-nhap-khau/';
hashToCleanUrl['#/en/import-export'] = '/en/import-export/';
hashToCleanUrl['#/es/import-export'] = '/es/import-export/';
hashToCleanUrl['#/tuyen-van-chuyen'] = '/vi/logistics/';
hashToCleanUrl['#/en/shipping-routes'] = '/en/logistics/';
hashToCleanUrl['#/es/rutas-de-envio'] = '/es/logistica/';
hashToCleanUrl['#/contact'] = '/vi/lien-he/';
hashToCleanUrl['#/en/contact'] = '/en/contact/';
hashToCleanUrl['#/es/contact'] = '/es/contacto/';

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
let totalReplacements = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let fileReplacements = 0;

  // Replace href="#/..." with clean paths
  content = content.replace(/href=(["'])(#[^"']+)\1/g, (match, quote, hash) => {
    // Preserve data-breadcrumb attributes
    if (hashToCleanUrl[hash]) {
      fileReplacements++;
      return `href=${quote}${hashToCleanUrl[hash]}${quote}`;
    }
    return match;
  });

  if (fileReplacements > 0) {
    fs.writeFileSync(f, content, 'utf8');
    totalReplacements += fileReplacements;
    console.log(`Updated ${fileReplacements} links in ${f}`);
  }
});

console.log(`\nTotal links replaced: ${totalReplacements}`);
