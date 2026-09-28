const http = require('http');

const routes = [
  // 1. Homepage
  { path: '/vi/', name: 'Home (VI)' },
  { path: '/en/', name: 'Home (EN)' },
  { path: '/es/', name: 'Home (ES)' },

  // 2. About Us
  { path: '/vi/ve-chung-toi/', name: 'About (VI)' },
  { path: '/en/about-us/', name: 'About (EN)' },
  { path: '/es/sobre-nosotros/', name: 'About (ES)' },

  // 3. Sourcing Service
  { path: '/vi/tim-nguon-hang/', name: 'Sourcing Service (VI)' },
  { path: '/en/sourcing/', name: 'Sourcing Service (EN)' },
  { path: '/es/abastecimiento/', name: 'Sourcing Service (ES)' },

  // 4. Logistics Parent
  { path: '/vi/logistics/', name: 'Logistics (VI)' },
  { path: '/en/logistics/', name: 'Logistics (EN)' },
  { path: '/es/logistica/', name: 'Logistics (ES)' },

  // 5. Logistics China Corridor
  { path: '/vi/logistics/china-to-us-ca-au/', name: 'China Corridor (VI)' },
  { path: '/en/logistics/china-to-us-ca-au/', name: 'China Corridor (EN)' },
  { path: '/es/logistica/china-to-us-ca-au/', name: 'China Corridor (ES)' },

  // 6. Logistics Vietnam Corridor
  { path: '/vi/logistics/vietnam-to-us-ca-au/', name: 'Vietnam Corridor (VI)' },
  { path: '/en/logistics/vietnam-to-us-ca-au/', name: 'Vietnam Corridor (EN)' },
  { path: '/es/logistica/vietnam-to-us-ca-au/', name: 'Vietnam Corridor (ES)' },

  // 7. Fulfillment Service
  { path: '/vi/kho-van/', name: 'Fulfillment / Kho Vận (VI)' },
  { path: '/en/fulfillment/', name: 'Fulfillment (EN)' },
  { path: '/es/almacenamiento/', name: 'Fulfillment / Almacenamiento (ES)' },

  // 8. Import & Export Service
  { path: '/vi/xuat-nhap-khau/', name: 'Import-Export (VI)' },
  { path: '/en/import-export/', name: 'Import-Export (EN)' },
  { path: '/es/import-export/', name: 'Import-Export (ES)' },

  // 9. Contact
  { path: '/vi/lien-he/', name: 'Contact (VI)' },
  { path: '/en/contact/', name: 'Contact (EN)' },
  { path: '/es/contacto/', name: 'Contact (ES)' },

  // 10. Knowledge Hub
  { path: '/vi/kien-thuc/', name: 'Knowledge Hub (VI)' },
  { path: '/en/knowledge/', name: 'Knowledge Hub (EN)' },
  { path: '/es/conocimiento/', name: 'Knowledge Hub (ES)' },

  // 11. Category Shipping Guides
  { path: '/vi/kien-thuc/huong-dan-van-chuyen/', name: 'Shipping Guides Cat (VI)' },
  { path: '/en/knowledge/shipping-guides/', name: 'Shipping Guides Cat (EN)' },
  { path: '/es/conocimiento/guias-de-envio/', name: 'Shipping Guides Cat (ES)' },

  // 12. Category Industry Guides
  { path: '/vi/kien-thuc/kien-thuc-nganh-hang/', name: 'Industry Guides Cat (VI)' },
  { path: '/en/knowledge/industry-guides/', name: 'Industry Guides Cat (EN)' },
  { path: '/es/conocimiento/guias-por-industria/', name: 'Industry Guides Cat (ES)' },

  // 13. Category Trade Routes
  { path: '/vi/kien-thuc/tuyen-thuong-mai/', name: 'Trade Routes Cat (VI)' },
  { path: '/en/knowledge/trade-routes/', name: 'Trade Routes Cat (EN)' },
  { path: '/es/conocimiento/rutas-comerciales/', name: 'Trade Routes Cat (ES)' },

  // 14. Category Sourcing & QC
  { path: '/vi/kien-thuc/sourcing-qc/', name: 'Sourcing & QC Cat (VI)' },
  { path: '/en/knowledge/sourcing-qc/', name: 'Sourcing & QC Cat (EN)' },
  { path: '/es/conocimiento/sourcing-qc/', name: 'Sourcing & QC Cat (ES)' },

  // 15. Category Fulfillment & Warehouse
  { path: '/vi/kien-thuc/fulfillment-kho-van/', name: 'Fulfillment & Warehouse Cat (VI)' },
  { path: '/en/knowledge/fulfillment-warehouse/', name: 'Fulfillment & Warehouse Cat (EN)' },
  { path: '/es/conocimiento/fulfillment-almacen/', name: 'Fulfillment & Warehouse Cat (ES)' },

  // 16. Category Import-Export News
  { path: '/vi/kien-thuc/tin-xuat-nhap-khau/', name: 'Import-Export News Cat (VI)' },
  { path: '/en/knowledge/import-export-news/', name: 'Import-Export News Cat (EN)' },
  { path: '/es/conocimiento/noticias-import-export/', name: 'Import-Export News Cat (ES)' },

  // 17. Single Post: Shipment Prep
  { path: '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/', name: 'Post Shipment Prep (VI)' },
  { path: '/en/knowledge/shipping-guides/preparing-your-shipment/', name: 'Post Shipment Prep (EN)' },
  { path: '/es/conocimiento/guias-de-envio/preparar-su-envio/', name: 'Post Shipment Prep (ES)' },

  // 18. Single Post: Fulfillment Receiving
  { path: '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/', name: 'Post Fulfillment Receiving (VI)' },
  { path: '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/', name: 'Post Fulfillment Receiving (EN)' },
  { path: '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/', name: 'Post Fulfillment Receiving (ES)' },

  // 19. Single Post: Quality Control
  { path: '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/', name: 'Post Quality Control (VI)' },
  { path: '/en/knowledge/sourcing-qc/quality-control/', name: 'Post Quality Control (EN)' },
  { path: '/es/conocimiento/sourcing-qc/control-de-calidad/', name: 'Post Quality Control (ES)' }
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode, location: res.headers.location });
    }).on('error', (err) => {
      resolve({ url, status: 'ERR: ' + err.message });
    });
  });
}

async function main() {
  console.log(`Starting verification of ${routes.length} canonical routes across Demo Server (:8000) and WordPress (:80)...`);
  let errors = 0;
  let success = 0;

  for (const r of routes) {
    const demoUrl = `http://localhost:8000${r.path}`;
    const wpUrl = `http://localhost/wordpress_demo${r.path}`;

    const resDemo = await checkUrl(demoUrl);
    const resWp = await checkUrl(wpUrl);

    const demoOk = (resDemo.status === 200);
    const wpOk = (resWp.status === 200);

    if (demoOk && wpOk) {
      success += 2;
    } else {
      errors++;
      console.log(`FAIL [${r.name}] Demo: ${resDemo.status} | WP: ${resWp.status}`);
      if (!demoOk) console.log(`  Demo URL: ${demoUrl} -> ${resDemo.status}`);
      if (!wpOk) console.log(`  WP URL:   ${wpUrl} -> ${resWp.status}`);
    }
  }

  // Also check 301 redirects for aliases
  const redirects = [
    { from: 'http://localhost:8000/', expected: '/en/' },
    { from: 'http://localhost/wordpress_demo/', expected: 'http://localhost/wordpress_demo/en/' },
    { from: 'http://localhost/wordpress_demo/vi/knowledge/', expected: 'http://localhost/wordpress_demo/vi/kien-thuc/' },
    { from: 'http://localhost/wordpress_demo/es/knowledge/', expected: 'http://localhost/wordpress_demo/es/conocimiento/' },
    { from: 'http://localhost/wordpress_demo/vi/contact/', expected: 'http://localhost/wordpress_demo/vi/lien-he/' },
    { from: 'http://localhost/wordpress_demo/es/contact/', expected: 'http://localhost/wordpress_demo/es/contacto/' },
    { from: 'http://localhost/wordpress_demo/es/logistics/', expected: 'http://localhost/wordpress_demo/es/logistica/' },
    { from: 'http://localhost/wordpress_demo/vi/fulfillment/', expected: 'http://localhost/wordpress_demo/vi/kho-van/' },
    { from: 'http://localhost/wordpress_demo/es/fulfillment/', expected: 'http://localhost/wordpress_demo/es/almacenamiento/' },
    { from: 'http://localhost/wordpress_demo/vi/hoan-tat-don-hang/', expected: 'http://localhost/wordpress_demo/vi/kho-van/' },
    { from: 'http://localhost:8000/vi/fulfillment/', expected: '/vi/kho-van/' },
    { from: 'http://localhost:8000/es/fulfillment/', expected: '/es/almacenamiento/' }
  ];

  console.log('\nChecking 301 alias redirects:');
  for (const redir of redirects) {
    const res = await checkUrl(redir.from);
    console.log(`Redirect Check: ${redir.from} -> ${res.status} [${res.location}]`);
  }

  console.log(`\n=== Verification Summary ===`);
  console.log(`Total URLs tested: ${routes.length * 2}`);
  console.log(`Successful (200 OK): ${success}`);
  console.log(`Failed: ${errors}`);
}

main();
