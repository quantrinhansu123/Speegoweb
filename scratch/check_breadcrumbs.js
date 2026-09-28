const fs = require('fs');

const testFiles = [
  'public/vi/fulfillment-kho-van/quy-trinh-nhap-kho/index.html',
  'public/en/fulfillment-warehouse/fulfillment-receiving/index.html',
  'public/es/fulfillment-almacen/recepcion-fulfillment/index.html',
  'public/vi/sourcing-qc/kiem-soat-chat-luong/index.html',
  'public/en/sourcing-qc/quality-control/index.html',
  'public/es/sourcing-qc/control-de-calidad/index.html'
];

testFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const m = c.match(/<nav class="breadcrumb-section"[\s\S]*?<\/nav>/i);
    console.log('=== ' + f + ' ===');
    console.log(m ? m[0] : 'NONE');
  } else {
    console.log('NOT FOUND: ' + f);
  }
});
