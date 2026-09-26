const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function captureRoute(routeName, hash) {
  const url = `http://localhost/wordpress_demo/${hash}`;
  const outDir = 'E:\\download\\xamp\\htdocs\\wordpress_demo';
  const desktopPng = path.join(outDir, `scr_${routeName}_desk.png`);
  const mobilePng = path.join(outDir, `scr_${routeName}_mob.png`);

  console.log(`Capturing [${routeName}] -> ${url}`);
  try {
    execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --screenshot="${desktopPng}" --window-size=1440,1200 "${url}"`, { stdio: 'pipe' });
    execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --screenshot="${mobilePng}" --window-size=375,812 "${url}"`, { stdio: 'pipe' });
    console.log(`  Done: desk=${fs.statSync(desktopPng).size} bytes, mob=${fs.statSync(mobilePng).size} bytes`);
    return { desktopPng, mobilePng };
  } catch (e) {
    console.error(`  Error capturing [${routeName}]:`, e.message);
    return null;
  }
}

const target = process.argv[2] || 'home';
const hash = process.argv[3] || '#/home';
captureRoute(target, hash);
