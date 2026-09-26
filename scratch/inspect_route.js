const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9225;
const hash = process.argv[2] || '#/knowledge';
const url = `http://localhost/wordpress_demo/${hash}`;

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  url
]);

async function run() {
  await new Promise(r => setTimeout(r, 3500));
  
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target found');
        edgeProcess.kill();
        return;
      }
      
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const h = document.querySelector('header');
              const main = document.getElementById('app-main');
              const sec = main ? main.querySelector('section') : null;
              const h1 = document.querySelector('h1');
              return {
                hash: window.location.hash,
                headerHeight: h ? h.offsetHeight : null,
                headerPos: h ? getComputedStyle(h).position : null,
                mainTop: main ? main.getBoundingClientRect().top : null,
                firstSecClass: sec ? sec.className : null,
                firstSecTop: sec ? sec.getBoundingClientRect().top : null,
                firstSecPadTop: sec ? getComputedStyle(sec).paddingTop : null,
                h1Top: h1 ? h1.getBoundingClientRect().top : null,
                h1Text: h1 ? h1.innerText.trim().slice(0, 50) : null
              };
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          const val = res.result?.result?.value;
          console.log(JSON.stringify(val || res, null, 2));
          ws.close();
          edgeProcess.kill();
        }
      };
    });
  }).on('error', (e) => {
    console.error('HTTP error:', e.message);
    edgeProcess.kill();
  });
}

run();
