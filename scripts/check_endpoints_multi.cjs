const http = require('http');

function tryRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', (e) => reject(e));
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function check(port) {
  try {
    console.log(`Checking port ${port}`);
    const jobs = await tryRequest({ hostname: '127.0.0.1', port, path: '/api/jobs', method: 'GET', timeout: 2000 });
    console.log('GET /api/jobs', jobs.status);

    const contact = await tryRequest({ hostname: '127.0.0.1', port, path: '/api/contact', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { nombre: 'Prueba', email: 'a@b.com', asunto: 'test', mensaje: 'hola' });
    console.log('POST /api/contact', contact.status);
    return true;
  } catch (e) {
    console.error(`Port ${port} error:`, e.message || e);
    return false;
  }
}

(async () => {
  for (const p of [5000, 5001, 5173]) {
    const ok = await check(p);
    if (ok) return;
  }
  process.exit(1);
})();
