const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9244;

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
              const sec = document.querySelector('#partners-speego');
              if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
              const h3 = document.querySelector('.speego-partners-copy-grid h3');
              const p = document.querySelector('.speego-partners-copy-grid p');
              const rectH3 = h3 ? h3.getBoundingClientRect() : {};
              const rectP = p ? p.getBoundingClientRect() : {};
              const elAtH3 = h3 ? document.elementFromPoint(rectH3.left + 10, rectH3.top + 10) : null;
              const elAtP = p ? document.elementFromPoint(rectP.left + 10, rectP.top + 10) : null;
              return {
                h3Text: h3 ? h3.innerText : '',
                h3Color: h3 ? getComputedStyle(h3).color : '',
                pColor: h3 ? getComputedStyle(p).color : '',
                h3Rect: { top: rectH3.top, left: rectH3.left, width: rectH3.width, height: rectH3.height },
                elAtH3: elAtH3 ? { tag: elAtH3.tagName, className: elAtH3.className, id: elAtH3.id } : null,
                elAtP: elAtP ? { tag: elAtP.tagName, className: elAtP.className, id: elAtP.id } : null
              };
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          console.log('ELEMENT FROM POINT RESULT:', JSON.stringify(res.result?.result?.value, null, 2));
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
