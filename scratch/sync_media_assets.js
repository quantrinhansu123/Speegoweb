const fs = require('fs');
const path = require('path');

const srcThemeImages = 'D:/Speegoweb/themes.pixelwars.org/logistica/demo-01/wp-content/themes/logistica/images';
const srcUploads = 'D:/Speegoweb/themes.pixelwars.org/logistica/demo-01/wp-content/uploads/sites/2/2023/08';
const destAssets = 'D:/Speegoweb/explore/assets';
const destWpAssets = 'E:/download/xamp/htdocs/wordpress_demo/wp-content/themes/speego-logistics/explore/assets';

const filesToCopy = [
  { from: path.join(srcThemeImages, '007-speego-logistics-team-1.png'), to: '007-speego-logistics-team-1.png' },
  { from: path.join(srcThemeImages, 'anh-nen.png'), to: 'anh-nen.png' },
  { from: path.join(srcThemeImages, 'why-plane.png'), to: 'why-plane.png' },
  { from: path.join(srcThemeImages, 'why-team.jpg'), to: 'why-team.jpg' },
  { from: path.join(srcThemeImages, 'why-speego-poster.jpg'), to: 'why-speego-poster.jpg' },
  { from: path.join(srcThemeImages, 'buoc-1.png'), to: 'buoc-1.png' },
  { from: path.join(srcUploads, 'loaded-container-cargo-ship-is-seen-front-as-it-speeds-ocean-generative-ai.jpg'), to: 'loaded-container-cargo-ship.jpg' },
  { from: path.join(srcUploads, 'global-logistic-airplane-parcel-box-concept-air-delivery-shipping-generative-ai.jpg'), to: 'global-logistic-airplane.jpg' },
  { from: path.join(srcUploads, 'foreman-control-loading-containers-box-from-cargo-freight-ship-import-export-created-with-generative-ai-technology-1060x398.jpg'), to: 'foreman-control-loading-containers.jpg' },
  { from: path.join(srcUploads, 'futuristic-truck-with-neon-lights-night-roadcreated-with-generative-ai-technology.jpg'), to: 'futuristic-truck.jpg' }
];

filesToCopy.forEach(item => {
  if (fs.existsSync(item.from)) {
    fs.copyFileSync(item.from, path.join(destAssets, item.to));
    fs.copyFileSync(item.from, path.join(destWpAssets, item.to));
    console.log('Copied:', item.to);
  } else {
    console.warn('File not found:', item.from);
  }
});

// Update home sections HTML
['vi', 'en', 'es'].forEach(lang => {
  const f = path.join('D:/Speegoweb/scratch', `${lang}_home_sections.html`);
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/wp-content\/uploads\/sites\/2\/2023\/08\/loaded-container-cargo-ship[^\"]+/g, 'assets/loaded-container-cargo-ship.jpg');
    content = content.replace(/wp-content\/uploads\/sites\/2\/2023\/08\/global-logistic-airplane[^\"]+/g, 'assets/global-logistic-airplane.jpg');
    content = content.replace(/wp-content\/uploads\/sites\/2\/2023\/08\/foreman-control-loading-containers[^\"]+/g, 'assets/foreman-control-loading-containers.jpg');
    content = content.replace(/wp-content\/uploads\/sites\/2\/2023\/08\/futuristic-truck[^\"]+/g, 'assets/futuristic-truck.jpg');
    content = content.replace(/wp-content\/themes\/logistica\/images\//g, 'assets/');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated:', f);
  }
});
