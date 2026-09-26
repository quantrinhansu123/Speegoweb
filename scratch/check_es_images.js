const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9235;

async function checkPageImages(hash) {
  const url = `http://localhost/wordpress_demo/${hash}`;
  const edgeProcess = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    url
  ]);

  await new Promise(r => setTimeout(r, 3500));
  
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const targets = JSON.parse(data);
        const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return {
                  hash: window.location.hash,
                  totalImages: imgs.length,
                  brokenImages: imgs.filter(img => img.naturalWidth === 0 && img.complete).map(img => img.src)
                };
              })()`,
              returnByValue: true
            }
          }));
        };
        ws.onmessage = (msg) => {
          const res = JSON.parse(msg.data);
          const val = res.result?.result?.value;
          console.log(`[${hash}]:`, val);
          ws.close();
          edgeProcess.kill();
          resolve(val);
        };
      });
    });
  });
}

async function runAll() {
  await checkPageImages('#/es/guias-por-industria');
  await new Promise(r => setTimeout(r, 1000));
  await checkPageImages('#/es/noticias-import-export');
  await new Promise(r => setTimeout(r, 1000));
  await checkPageImages('#/es/inicio');
}

runAll();
