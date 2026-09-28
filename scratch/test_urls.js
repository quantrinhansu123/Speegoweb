const http = require('http');

const urls = [
  'http://localhost:8000/vi/fulfillment/',
  'http://localhost:8000/en/fulfillment/',
  'http://localhost:8000/es/fulfillment/',
  'http://localhost/wordpress_demo/vi/fulfillment/',
  'http://localhost/wordpress_demo/en/fulfillment/',
  'http://localhost/wordpress_demo/es/fulfillment/',

  'http://localhost:8000/vi/xuat-nhap-khau/',
  'http://localhost:8000/en/import-export/',
  'http://localhost:8000/es/import-export/',
  'http://localhost/wordpress_demo/vi/xuat-nhap-khau/',
  'http://localhost/wordpress_demo/en/import-export/',
  'http://localhost/wordpress_demo/es/import-export/',

  'http://localhost:8000/vi/logistics/',
  'http://localhost:8000/en/logistics/',
  'http://localhost:8000/es/logistics/',
  'http://localhost/wordpress_demo/vi/logistics/',
  'http://localhost/wordpress_demo/en/logistics/',
  'http://localhost/wordpress_demo/es/logistics/',

  'http://localhost:8000/vi/logistics/china-to-us-ca-au/',
  'http://localhost:8000/en/logistics/china-to-us-ca-au/',
  'http://localhost:8000/es/logistics/china-to-us-ca-au/',
  'http://localhost/wordpress_demo/vi/logistics/china-to-us-ca-au/',
  'http://localhost/wordpress_demo/en/logistics/china-to-us-ca-au/',
  'http://localhost/wordpress_demo/es/logistics/china-to-us-ca-au/',

  'http://localhost:8000/vi/logistics/vietnam-to-us-ca-au/',
  'http://localhost:8000/en/logistics/vietnam-to-us-ca-au/',
  'http://localhost:8000/es/logistics/vietnam-to-us-ca-au/',
  'http://localhost/wordpress_demo/vi/logistics/vietnam-to-us-ca-au/',
  'http://localhost/wordpress_demo/en/logistics/vietnam-to-us-ca-au/',
  'http://localhost/wordpress_demo/es/logistics/vietnam-to-us-ca-au/',

  'http://localhost:8000/vi/knowledge/',
  'http://localhost:8000/en/knowledge/',
  'http://localhost:8000/es/knowledge/',
  'http://localhost/wordpress_demo/vi/knowledge/',
  'http://localhost/wordpress_demo/en/knowledge/',
  'http://localhost/wordpress_demo/es/knowledge/',

  'http://localhost:8000/vi/knowledge/huong-dan-van-chuyen/',
  'http://localhost:8000/en/knowledge/shipping-guides/',
  'http://localhost:8000/es/knowledge/guias-de-envio/',
  'http://localhost/wordpress_demo/vi/knowledge/huong-dan-van-chuyen/',
  'http://localhost/wordpress_demo/en/knowledge/shipping-guides/',
  'http://localhost/wordpress_demo/es/knowledge/guias-de-envio/',

  'http://localhost:8000/vi/knowledge/kien-thuc-nganh-hang/',
  'http://localhost:8000/en/knowledge/industry-guides/',
  'http://localhost:8000/es/knowledge/guias-por-industria/',
  'http://localhost/wordpress_demo/vi/knowledge/kien-thuc-nganh-hang/',
  'http://localhost/wordpress_demo/en/knowledge/industry-guides/',
  'http://localhost/wordpress_demo/es/knowledge/guias-por-industria/',

  'http://localhost:8000/vi/knowledge/tuyen-thuong-mai/',
  'http://localhost:8000/en/knowledge/trade-routes/',
  'http://localhost:8000/es/knowledge/rutas-comerciales/',
  'http://localhost/wordpress_demo/vi/knowledge/tuyen-thuong-mai/',
  'http://localhost/wordpress_demo/en/knowledge/trade-routes/',
  'http://localhost/wordpress_demo/es/knowledge/rutas-comerciales/',

  'http://localhost:8000/vi/knowledge/sourcing-qc/',
  'http://localhost:8000/en/knowledge/sourcing-qc/',
  'http://localhost:8000/es/knowledge/sourcing-qc/',
  'http://localhost/wordpress_demo/vi/knowledge/sourcing-qc/',
  'http://localhost/wordpress_demo/en/knowledge/sourcing-qc/',
  'http://localhost/wordpress_demo/es/knowledge/sourcing-qc/',

  'http://localhost:8000/vi/knowledge/fulfillment-kho-van/',
  'http://localhost:8000/en/knowledge/fulfillment-warehouse/',
  'http://localhost:8000/es/knowledge/fulfillment-almacen/',
  'http://localhost/wordpress_demo/vi/knowledge/fulfillment-kho-van/',
  'http://localhost/wordpress_demo/en/knowledge/fulfillment-warehouse/',
  'http://localhost/wordpress_demo/es/knowledge/fulfillment-almacen/',

  'http://localhost:8000/vi/knowledge/tin-xuat-nhap-khau/',
  'http://localhost:8000/en/knowledge/import-export-news/',
  'http://localhost:8000/es/knowledge/noticias-import-export/',
  'http://localhost/wordpress_demo/vi/knowledge/tin-xuat-nhap-khau/',
  'http://localhost/wordpress_demo/en/knowledge/import-export-news/',
  'http://localhost/wordpress_demo/es/knowledge/noticias-import-export/',

  'http://localhost:8000/vi/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  'http://localhost:8000/en/shipping-guides/preparing-your-shipment/',
  'http://localhost:8000/es/guias-de-envio/preparar-su-envio/',
  'http://localhost/wordpress_demo/vi/huong-dan-van-chuyen/chuan-bi-lo-hang/',
  'http://localhost/wordpress_demo/en/shipping-guides/preparing-your-shipment/',
  'http://localhost/wordpress_demo/es/guias-de-envio/preparar-su-envio/',

  'http://localhost:8000/vi/fulfillment-kho-van/quy-trinh-nhap-kho/',
  'http://localhost:8000/en/fulfillment-warehouse/fulfillment-receiving/',
  'http://localhost:8000/es/fulfillment-almacen/recepcion-fulfillment/',
  'http://localhost/wordpress_demo/vi/fulfillment-kho-van/quy-trinh-nhap-kho/',
  'http://localhost/wordpress_demo/en/fulfillment-warehouse/fulfillment-receiving/',
  'http://localhost/wordpress_demo/es/fulfillment-almacen/recepcion-fulfillment/',

  'http://localhost:8000/vi/sourcing-qc/kiem-soat-chat-luong/',
  'http://localhost:8000/en/sourcing-qc/quality-control/',
  'http://localhost:8000/es/sourcing-qc/control-de-calidad/',
  'http://localhost/wordpress_demo/vi/sourcing-qc/kiem-soat-chat-luong/',
  'http://localhost/wordpress_demo/en/sourcing-qc/quality-control/',
  'http://localhost/wordpress_demo/es/sourcing-qc/control-de-calidad/'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERR: ' + err.message });
    });
  });
}

async function main() {
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`${res.status} ${res.url}`);
  }
}
main();
