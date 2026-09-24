const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "themes.pixelwars.org",
  "logistica",
  "demo-01"
);
const dest = path.join(__dirname, "public");
const exploreSrc = path.join(__dirname, "explore");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(fromPath, toPath);
    } else if (entry.isFile()) {
      try {
        fs.copyFileSync(fromPath, toPath);
      } catch (err) {
        // ignore lock on unchanged active files
      }
    }
  }
}

if (!fs.existsSync(src)) {
  console.error("Missing source:", src);
  process.exit(1);
}

try {
  fs.mkdirSync(dest, { recursive: true });
} catch (e) {}

copyDir(src, dest);
if (!fs.existsSync(exploreSrc)) {
  console.error("Missing source:", exploreSrc);
  process.exit(1);
}
copyDir(exploreSrc, path.join(dest, "explore"));
require("./generate-seo-pages").generate({ root: __dirname, output: dest });
console.log("Prepared homepage and crawlable explore pages for Vercel");
