const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "themes.pixelwars.org",
  "logistica",
  "demo-01"
);
const dest = path.join(__dirname, "public");

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
console.log("Prepared public/ from demo-01 for Vercel");
