const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9239;

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
        // Wait 3 seconds for SPA routing and DB fetch to complete
        await new Promise(r => setTimeout(r, 3000));
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const sec = document.querySelector('#partners-speego');
              const grid = sec ? sec.querySelector('.speego-partners-copy-grid') : null;
              const articles = grid ? Array.from(grid.querySelectorAll('article')).map(a => {
                const h3 = a.querySelector('h3');
                const p = a.querySelector('p');
                return {
                  h3Text: h3 ? h3.innerText : '',
                  h3Color: h3 ? getComputedStyle(h3).color : '',
                  pText: p ? p.innerText : '',
                  pColor: p ? getComputedStyle(p).color : '',
                  border: getComputedStyle(a).borderLeft
                };
              }) : [];
              const track = document.getElementById('speego-trust-logo-track');
              const imgs = track ? Array.from(track.querySelectorAll('img')).map(i => ({
                src: i.src,
                naturalWidth: i.naturalWidth,
                naturalHeight: i.naturalHeight,
                complete: i.complete,
                display: getComputedStyle(i).display
              })) : [];
              return {
                currentHash: window.location.hash,
                secFound: !!sec,
                articles,
                trackFound: !!track,
                imgsCount: imgs.length,
                imgsSample: imgs.slice(0, 4)
              };
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          console.log('PARTNERS VERIFICATION:', JSON.stringify(res.result?.result?.value, null, 2));
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
