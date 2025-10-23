const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: 5000, path, method: 'GET' }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({ hostname: '127.0.0.1', port: 5000, path, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, (res) => {
      let resp = '';
      res.on('data', (c) => resp += c);
      res.on('end', () => resolve({ status: res.statusCode, body: resp }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  try {
    console.log('GET /api/jobs');
    console.log(await get('/api/jobs'));

    console.log('POST /api/contact');
    console.log(await post('/api/contact', { nombre: 'Prueba', email: 'a@b.com', asunto: 'consulta-general', mensaje: 'hola' }));
  } catch (e) {
    console.error('Error', e.message);
    process.exit(1);
  }
})();
