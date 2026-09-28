const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8000);
const ROOT = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp'
};

let REDIRECTS = {};
try {
  const routeMapFile = path.join(__dirname, 'route-map.json');
  if (fs.existsSync(routeMapFile)) {
    const routeMap = JSON.parse(fs.readFileSync(routeMapFile, 'utf8'));
    REDIRECTS = routeMap.aliases || {};
  }
} catch (e) {
  console.warn('Could not read route-map.json for REDIRECTS:', e);
}

const server = http.createServer((req, res) => {
  let requestUrl;
  try {
    requestUrl = new URL(req.url, 'http://localhost');
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  const redirected = REDIRECTS[requestUrl.pathname];
  if (redirected) {
    res.writeHead(301, { Location: redirected });
    res.end();
    return;
  }

  if (requestUrl.searchParams.has('lang')) {
    requestUrl.searchParams.delete('lang');
    const search = requestUrl.searchParams.toString();
    res.writeHead(301, { Location: requestUrl.pathname + (search ? `?${search}` : '') });
    res.end();
    return;
  }

  let decodedUrl;
  try {
    decodedUrl = decodeURI(requestUrl.pathname);
  } catch (e) {
    decodedUrl = requestUrl.pathname;
  }

  let filePath = path.join(ROOT, decodedUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (!fs.existsSync(filePath)) {
    const localeAssetMatch = decodedUrl.match(/^\/(?:en|vi|es)\/(.+)$/);
    if (localeAssetMatch) {
      const fallbackPath = path.join(ROOT, localeAssetMatch[1]);
      if (fs.existsSync(fallbackPath) && fs.statSync(fallbackPath).isFile()) {
        filePath = fallbackPath;
      }
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + decodedUrl);
  }
});

server.listen(PORT, () => {
  console.log(`SpeeGo Demo Server is running at http://localhost:${PORT}/`);
  console.log(`Explore Demo: http://localhost:${PORT}/explore/`);
});
