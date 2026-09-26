const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9241;

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  'http://localhost/wordpress_demo/#/home'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        edgeProcess.kill();
        return;
      }
      
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      
      ws.onopen = async () => {
        await new Promise(r => setTimeout(r, 3000));
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const h3 = document.querySelector('.speego-partners-copy-grid h3');
              const p = document.querySelector('.speego-partners-copy-grid p');
              const article = document.querySelector('.speego-partners-copy-grid article');
              const grid = document.querySelector('.speego-partners-copy-grid');
              const sec = document.querySelector('#partners-speego');
              
              const getProps = (el) => {
                if (!el) return null;
                const cs = getComputedStyle(el);
                return {
                  color: cs.color,
                  opacity: cs.opacity,
                  filter: cs.filter,
                  visibility: cs.visibility,
                  backgroundColor: cs.backgroundColor,
                  mixBlendMode: cs.mixBlendMode,
                  display: cs.display
                };
              };
              
              return {
                h3: getProps(h3),
                p: getProps(p),
                article: getProps(article),
                grid: getProps(grid),
                sec: getProps(sec)
              };
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          console.log('CSS COMPUTED PROPS:', JSON.stringify(res.result?.result?.value, null, 2));
          ws.close();
          edgeProcess.kill();
          process.exit(0);
        }
      };
    });
  });
}

run().catch(err => {
  console.error(err);
  edgeProcess.kill();
  process.exit(1);
});
