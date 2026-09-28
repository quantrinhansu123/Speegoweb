const fs = require('fs');
const path = require('path');

const exploreDir = path.join(__dirname, 'explore');
const headerFile = path.join(exploreDir, 'partials', 'header.html');
const footerFile = path.join(exploreDir, 'partials', 'footer.html');
const ctaFile = path.join(exploreDir, 'partials', 'cta-form.html');
const indexFile = path.join(exploreDir, 'index.html');

const headerHtml = fs.readFileSync(headerFile, 'utf8');
const footerHtml = fs.readFileSync(footerFile, 'utf8');
const ctaHtml = fs.readFileSync(ctaFile, 'utf8');

let indexContent = fs.readFileSync(indexFile, 'utf8');

const bundleObj = {
  "partials/header.html": headerHtml,
  "partials/footer.html": footerHtml,
  "partials/cta-form.html": ctaHtml
};

const bundleStart = 'const OFFLINE_BUNDLE = ';
const bundleEnd = '// In-memory cache';

const sIdx = indexContent.indexOf(bundleStart);
const eIdx = indexContent.indexOf(bundleEnd, sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  indexContent = indexContent.substring(0, sIdx + bundleStart.length) +
    JSON.stringify(bundleObj) + ';\n      ' +
    indexContent.substring(eIdx);
  console.log('Successfully updated OFFLINE_BUNDLE in explore/index.html');
}

// Fix navLinkAbout to about-us
indexContent = indexContent.replace(
  /\{\s*id:\s*'navLinkAbout'[^}]+\}/,
  "{ id: 'navLinkAbout', mId: 'mNavLinkAbout', href: isVi ? '#/about-us' : (isEs ? '#/es/about-us' : '#/en/about-us') }"
);

fs.writeFileSync(indexFile, indexContent, 'utf8');
console.log('explore/index.html updated successfully');
