const fs = require('fs');

const pathUpdates = {
  '#/knowledge': { path: '/vi/kien-thuc/', slug: 'kien-thuc' },
  '#/en/knowledge': { path: '/en/knowledge/', slug: 'knowledge-en' },
  '#/es/knowledge': { path: '/es/conocimiento/', slug: 'conocimiento-es' },

  '#/knowledge/huong-dan-van-chuyen': { path: '/vi/kien-thuc/huong-dan-van-chuyen/' },
  '#/en/shipping-guides': { path: '/en/knowledge/shipping-guides/' },
  '#/es/guias-de-envio': { path: '/es/conocimiento/guias-de-envio/' },

  '#/knowledge/kien-thuc-nganh-hang': { path: '/vi/kien-thuc/kien-thuc-nganh-hang/' },
  '#/en/industry-guides': { path: '/en/knowledge/industry-guides/' },
  '#/es/guias-por-industria': { path: '/es/conocimiento/guias-por-industria/' },

  '#/knowledge/tuyen-thuong-mai': { path: '/vi/kien-thuc/tuyen-thuong-mai/' },
  '#/en/trade-routes': { path: '/en/knowledge/trade-routes/' },
  '#/es/rutas-comerciales': { path: '/es/conocimiento/rutas-comerciales/' },

  '#/knowledge/sourcing-qc': { path: '/vi/kien-thuc/sourcing-qc/' },
  '#/en/sourcing-qc': { path: '/en/knowledge/sourcing-qc/' },
  '#/es/sourcing-qc': { path: '/es/conocimiento/sourcing-qc/' },

  '#/knowledge/fulfillment-kho-van': { path: '/vi/kien-thuc/fulfillment-kho-van/' },
  '#/en/fulfillment-warehouse': { path: '/en/knowledge/fulfillment-warehouse/' },
  '#/es/fulfillment-almacen': { path: '/es/conocimiento/fulfillment-almacen/' },

  '#/knowledge/tin-xuat-nhap-khau': { path: '/vi/kien-thuc/tin-xuat-nhap-khau/' },
  '#/en/import-export-news': { path: '/en/knowledge/import-export-news/' },
  '#/es/noticias-import-export': { path: '/es/conocimiento/noticias-import-export/' },

  '#/knowledge/chuan-bi-lo-hang': { path: '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/' },
  '#/en/post/preparing-your-shipment': { path: '/en/knowledge/shipping-guides/preparing-your-shipment/' },
  '#/es/post/preparar-su-envio': { path: '/es/conocimiento/guias-de-envio/preparar-su-envio/' },

  '#/knowledge/quy-trinh-nhap-kho': { path: '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/' },
  '#/en/post/fulfillment-receiving': { path: '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/' },
  '#/es/post/recepcion-fulfillment': { path: '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/' },

  '#/knowledge/kiem-soat-chat-luong': { path: '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/' },
  '#/en/post/quality-control': { path: '/en/knowledge/sourcing-qc/quality-control/' },
  '#/es/post/control-de-calidad': { path: '/es/conocimiento/sourcing-qc/control-de-calidad/' },

  '#/contact': { path: '/vi/lien-he/', slug: 'lien-he' },
  '#/en/contact': { path: '/en/contact/', slug: 'contact-en' },
  '#/es/contact': { path: '/es/contacto/', slug: 'contacto-es' },

  '#/es/rutas-de-envio': { path: '/es/logistica/', slug: 'logistica-es' },
  '#/es/logistica/china-a-eeuu-canada-australia': { path: '/es/logistica/china-to-us-ca-au/' },
  '#/es/logistica/vietnam-a-eeuu-canada-australia': { path: '/es/logistica/vietnam-to-us-ca-au/' }
};

const newAliases = {
  // Knowledge Hub base redirects
  '/vi/knowledge': '/vi/kien-thuc/',
  '/vi/knowledge/': '/vi/kien-thuc/',
  '/es/knowledge': '/es/conocimiento/',
  '/es/knowledge/': '/es/conocimiento/',

  // Contact redirects
  '/vi/contact': '/vi/lien-he/',
  '/vi/contact/': '/vi/lien-he/',
  '/es/contact': '/es/contacto/',
  '/es/contact/': '/es/contacto/',

  // Logistics ES redirects
  '/es/logistics': '/es/logistica/',
  '/es/logistics/': '/es/logistica/',
  '/es/logistics/china-to-us-ca-au': '/es/logistica/china-to-us-ca-au/',
  '/es/logistics/china-to-us-ca-au/': '/es/logistica/china-to-us-ca-au/',
  '/es/logistics/vietnam-to-us-ca-au': '/es/logistica/vietnam-to-us-ca-au/',
  '/es/logistics/vietnam-to-us-ca-au/': '/es/logistica/vietnam-to-us-ca-au/',

  // VI Knowledge categories redirects from /vi/knowledge/* to /vi/kien-thuc/*
  '/vi/knowledge/huong-dan-van-chuyen': '/vi/kien-thuc/huong-dan-van-chuyen/',
  '/vi/knowledge/huong-dan-van-chuyen/': '/vi/kien-thuc/huong-dan-van-chuyen/',
  '/vi/knowledge/kien-thuc-nganh-hang': '/vi/kien-thuc/kien-thuc-nganh-hang/',
  '/vi/knowledge/kien-thuc-nganh-hang/': '/vi/kien-thuc/kien-thuc-nganh-hang/',
  '/vi/knowledge/tuyen-thuong-mai': '/vi/kien-thuc/tuyen-thuong-mai/',
  '/vi/knowledge/tuyen-thuong-mai/': '/vi/kien-thuc/tuyen-thuong-mai/',
  '/vi/knowledge/sourcing-qc': '/vi/kien-thuc/sourcing-qc/',
  '/vi/knowledge/sourcing-qc/': '/vi/kien-thuc/sourcing-qc/',
  '/vi/knowledge/fulfillment-kho-van': '/vi/kien-thuc/fulfillment-kho-van/',
  '/vi/knowledge/fulfillment-kho-van/': '/vi/kien-thuc/fulfillment-kho-van/',
  '/vi/knowledge/tin-xuat-nhap-khau': '/vi/kien-thuc/tin-xuat-nhap-khau/',
  '/vi/knowledge/tin-xuat-nhap-khau/': '/vi/kien-thuc/tin-xuat-nhap-khau/',

  // ES Knowledge categories redirects from /es/knowledge/* to /es/conocimiento/*
  '/es/knowledge/guias-de-envio': '/es/conocimiento/guias-de-envio/',
  '/es/knowledge/guias-de-envio/': '/es/conocimiento/guias-de-envio/',
  '/es/knowledge/guias-por-industria': '/es/conocimiento/guias-por-industria/',
  '/es/knowledge/guias-por-industria/': '/es/conocimiento/guias-por-industria/',
  '/es/knowledge/rutas-comerciales': '/es/conocimiento/rutas-comerciales/',
  '/es/knowledge/rutas-comerciales/': '/es/conocimiento/rutas-comerciales/',
  '/es/knowledge/sourcing-qc': '/es/conocimiento/sourcing-qc/',
  '/es/knowledge/sourcing-qc/': '/es/conocimiento/sourcing-qc/',
  '/es/knowledge/fulfillment-almacen': '/es/conocimiento/fulfillment-almacen/',
  '/es/knowledge/fulfillment-almacen/': '/es/conocimiento/fulfillment-almacen/',
  '/es/knowledge/noticias-import-export': '/es/conocimiento/noticias-import-export/',
  '/es/knowledge/noticias-import-export/': '/es/conocimiento/noticias-import-export/',

  // Single post redirects (old non-hierarchical to new full hierarchy)
  '/vi/huong-dan-van-chuyen/chuan-bi-lo-hang': '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  '/vi/huong-dan-van-chuyen/chuan-bi-lo-hang/': '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  '/vi/knowledge/chuan-bi-lo-hang': '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  '/vi/knowledge/chuan-bi-lo-hang/': '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/',

  '/en/shipping-guides/preparing-your-shipment': '/en/knowledge/shipping-guides/preparing-your-shipment/',
  '/en/shipping-guides/preparing-your-shipment/': '/en/knowledge/shipping-guides/preparing-your-shipment/',
  '/en/post/preparing-your-shipment': '/en/knowledge/shipping-guides/preparing-your-shipment/',
  '/en/post/preparing-your-shipment/': '/en/knowledge/shipping-guides/preparing-your-shipment/',

  '/es/guias-de-envio/preparar-su-envio': '/es/conocimiento/guias-de-envio/preparar-su-envio/',
  '/es/guias-de-envio/preparar-su-envio/': '/es/conocimiento/guias-de-envio/preparar-su-envio/',
  '/es/post/preparar-su-envio': '/es/conocimiento/guias-de-envio/preparar-su-envio/',
  '/es/post/preparar-su-envio/': '/es/conocimiento/guias-de-envio/preparar-su-envio/',

  '/vi/fulfillment-kho-van/quy-trinh-nhap-kho': '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/',
  '/vi/fulfillment-kho-van/quy-trinh-nhap-kho/': '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/',
  '/vi/knowledge/quy-trinh-nhap-kho': '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/',
  '/vi/knowledge/quy-trinh-nhap-kho/': '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/',

  '/en/fulfillment-warehouse/fulfillment-receiving': '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/',
  '/en/fulfillment-warehouse/fulfillment-receiving/': '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/',
  '/en/post/fulfillment-receiving': '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/',
  '/en/post/fulfillment-receiving/': '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/',

  '/es/fulfillment-almacen/recepcion-fulfillment': '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/',
  '/es/fulfillment-almacen/recepcion-fulfillment/': '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/',
  '/es/post/recepcion-fulfillment': '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/',
  '/es/post/recepcion-fulfillment/': '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/',

  '/vi/sourcing-qc/kiem-soat-chat-luong': '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/',
  '/vi/sourcing-qc/kiem-soat-chat-luong/': '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/',
  '/vi/knowledge/kiem-soat-chat-luong': '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/',
  '/vi/knowledge/kiem-soat-chat-luong/': '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/',

  '/en/sourcing-qc/quality-control': '/en/knowledge/sourcing-qc/quality-control/',
  '/en/sourcing-qc/quality-control/': '/en/knowledge/sourcing-qc/quality-control/',
  '/en/post/quality-control': '/en/knowledge/sourcing-qc/quality-control/',
  '/en/post/quality-control/': '/en/knowledge/sourcing-qc/quality-control/',

  '/es/sourcing-qc/control-de-calidad': '/es/conocimiento/sourcing-qc/control-de-calidad/',
  '/es/sourcing-qc/control-de-calidad/': '/es/conocimiento/sourcing-qc/control-de-calidad/',
  '/es/post/control-de-calidad': '/es/conocimiento/sourcing-qc/control-de-calidad/',
  '/es/post/control-de-calidad/': '/es/conocimiento/sourcing-qc/control-de-calidad/'
};

['route-map.json', 'wordpress-theme/speego-logistics/route-map.json'].forEach(fp => {
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'));

  // Update page paths
  for (const [hash, patch] of Object.entries(pathUpdates)) {
    if (data.pages[hash]) {
      Object.assign(data.pages[hash], patch);
    }
  }

  // Update aliases
  Object.assign(data.aliases, newAliases);

  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated route map: ${fp}`);
});
