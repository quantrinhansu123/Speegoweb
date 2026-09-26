const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9230;

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  'http://localhost/wordpress_demo/#/sourcing'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2500));
  
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
      let step = 0;
      
      ws.onopen = () => {
        console.log('Testing Menu Links from #/sourcing...');
        // Step 1: Click About
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const aboutLink = document.getElementById('navLinkAbout');
              if (aboutLink) aboutLink.click();
              return { clicked: !!aboutLink, hash: window.location.hash };
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = async (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          console.log('Step 1 (Click About):', res.result?.result?.value);
          await new Promise(r => setTimeout(r, 1500));
          // Step 2: Check current URL & scroll position
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const whySpeego = document.getElementById('why-speego');
                return {
                  hash: window.location.hash,
                  whySpeegoFound: !!whySpeego,
                  whySpeegoTop: whySpeego ? whySpeego.getBoundingClientRect().top : null,
                  scrollY: window.scrollY
                };
              })()`,
              returnByValue: true
            }
          }));
        } else if (res.id === 2) {
          console.log('Step 2 (About Result):', res.result?.result?.value);
          // Step 3: Check image loading errors across pages
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return {
                  totalImages: imgs.length,
                  brokenImages: imgs.filter(img => img.naturalWidth === 0 && img.complete).map(img => img.src)
                };
              })()`,
              returnByValue: true
            }
          }));
        } else if (res.id === 3) {
          console.log('Step 3 (Images Check):', res.result?.result?.value);
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
