const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'explore', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add VI about route
const viTarget = `        '#/es/inicio': {
          file: 'pages/home/es-home.html',
          title: 'SpeeGo Logistics | Abastecimiento y logística global',
          nav: 'home',
          lang: 'es'
        },`;

const viReplacement = `        '#/es/inicio': {
          file: 'pages/home/es-home.html',
          title: 'SpeeGo Logistics | Abastecimiento y logística global',
          nav: 'home',
          lang: 'es'
        },
        // About Us Routes (Tri-lingual)
        '#/about-us': {
          file: 'pages/about/vi-about.html',
          title: 'Về SpeeGo Logistics | Đối tác cung ứng & logistics toàn cầu',
          nav: 'about',
          lang: 'vi'
        },
        '#/about': {
          file: 'pages/about/vi-about.html',
          title: 'Về SpeeGo Logistics | Đối tác cung ứng & logistics toàn cầu',
          nav: 'about',
          lang: 'vi'
        },`;

if (!content.includes("'#/about-us':")) {
  content = content.replace(viTarget, viReplacement);
}

// 2. Add EN about route
const enTarget = `        // Core 5 Section Primary Routes (English)`;
const enReplacement = `        // About Us Routes (English)
        '#/en/about-us': {
          file: 'pages/about/en-about.html',
          title: 'About SpeeGo Logistics | Global Sourcing & Supply Chain Partner',
          nav: 'about',
          lang: 'en'
        },
        '#/en/about': {
          file: 'pages/about/en-about.html',
          title: 'About SpeeGo Logistics | Global Sourcing & Supply Chain Partner',
          nav: 'about',
          lang: 'en'
        },
        // Core 5 Section Primary Routes (English)`;

if (!content.includes("'#/en/about-us':")) {
  content = content.replace(enTarget, enReplacement);
}

// 3. Add ES about route
const esTarget = `        // Core 5 Section Primary Routes (Spanish)`;
const esReplacement = `        // About Us Routes (Spanish)
        '#/es/about-us': {
          file: 'pages/about/es-about.html',
          title: 'Sobre SpeeGo Logistics | Socio de abastecimiento y logística global',
          nav: 'about',
          lang: 'es'
        },
        '#/es/about': {
          file: 'pages/about/es-about.html',
          title: 'Sobre SpeeGo Logistics | Socio de abastecimiento y logística global',
          nav: 'about',
          lang: 'es'
        },
        '#/es/sobre-nosotros': {
          file: 'pages/about/es-about.html',
          title: 'Sobre SpeeGo Logistics | Socio de abastecimiento y logística global',
          nav: 'about',
          lang: 'es'
        },
        // Core 5 Section Primary Routes (Spanish)`;

if (!content.includes("'#/es/about-us':")) {
  content = content.replace(esTarget, esReplacement);
}

// 4. Update TRI_LANG_MAP
const triTarget = `const TRI_LANG_MAP = [
        { vi: '#/home', en: '#/en/home', es: '#/es/inicio' },`;

const triReplacement = `const TRI_LANG_MAP = [
        { vi: '#/home', en: '#/en/home', es: '#/es/inicio' },
        { vi: '#/about-us', en: '#/en/about-us', es: '#/es/about-us' },`;

if (!content.includes("{ vi: '#/about-us', en: '#/en/about-us', es: '#/es/about-us' }")) {
  content = content.replace(triTarget, triReplacement);
}

// 5. Update navLinkAbout in updateShellLanguage
const navLinkTarget = `{ id: 'navLinkAbout', mId: 'mNavLinkAbout', href: '#why-speego' },`;
const navLinkReplacement = `{ id: 'navLinkAbout', mId: 'mNavLinkAbout', href: isVi ? '#/about-us' : (isEs ? '#/es/about-us' : '#/en/about-us') },`;
content = content.replace(navLinkTarget, navLinkReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated explore/index.html with About routes!');
