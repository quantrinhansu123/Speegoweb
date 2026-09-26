const fs = require('fs');

async function testHeader() {
  const res = await fetch('http://localhost/wordpress_demo/wp-json/speego/v1/content?partial=header-vi');
  const j = await res.json();
  const c = j.content || '';
  console.log('Header length:', c.length);
  const dataI18nMatches = [...c.matchAll(/data-i18n="([^"]+)"/g)];
  console.log('Total data-i18n in header:', dataI18nMatches.length);
  console.log('Sample keys:', dataI18nMatches.map(m => m[1]).slice(0, 10));
}

testHeader().catch(console.error);
