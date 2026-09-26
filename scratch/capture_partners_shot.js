const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9245;

const edgeProcess = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,1000',
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
        // Wait 3.5 seconds for complete render
        await new Promise(r => setTimeout(r, 3500));
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const sec = document.querySelector('#partners-speego');
              if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
              return !!sec;
            })()`,
            returnByValue: true
          }
        }));
      };
      
      ws.onmessage = async (msg) => {
        const res = JSON.parse(msg.data);
        if (res.id === 1) {
          // Wait 2 seconds for visual settle
          await new Promise(r => setTimeout(r, 2000));
          ws.send(JSON.stringify({
            id: 2,
            method: 'Page.captureScreenshot',
            params: { format: 'png', captureBeyondViewport: false }
          }));
        } else if (res.id === 2) {
          const buffer = Buffer.from(res.result.data, 'base64');
          const outPath = 'D:\\Speegoweb\\scratch\\partners_section_verified2.png';
          fs.writeFileSync(outPath, buffer);
          console.log(`Saved screenshot to ${outPath} (${buffer.length} bytes)`);
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
