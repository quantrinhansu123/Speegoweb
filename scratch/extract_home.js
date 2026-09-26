const fs = require('fs');

['vi', 'en', 'es'].forEach(lang => {
  const p = `D:/Speegoweb/public/${lang}/index.html`;
  const content = fs.readFileSync(p, 'utf8');
  const start = content.indexOf('<section class="speego-hero-section" id="home">');
  const newsIdx = content.indexOf('id="news-speego"');
  const end = content.indexOf('</section>', newsIdx) + '</section>'.length;
  console.log(`Lang [${lang}]: start=${start}, end=${end}, totalLength=${end - start}`);
  if (start > 0 && end > start) {
    let sectionsHtml = content.substring(start, end).trim();
    // Normalize relative asset paths:
    // e.g. "wp-content/themes/logistica/images/" -> "assets/"
    sectionsHtml = sectionsHtml.replace(/wp-content\/themes\/logistica\/images\//g, 'assets/');
    sectionsHtml = sectionsHtml.replace(/wp-content\/themes\/logistica\//g, 'assets/');
    fs.writeFileSync(`D:/Speegoweb/scratch/${lang}_home_sections.html`, sectionsHtml, 'utf8');
    console.log(`  Saved D:/Speegoweb/scratch/${lang}_home_sections.html (${sectionsHtml.length} bytes)`);
  }
});
