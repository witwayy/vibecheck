const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// .env 파일에서 키 읽기
let ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match) ANTHROPIC_API_KEY = match[1].trim();
  }
} catch (e) {}

if (!ANTHROPIC_API_KEY) {
  console.error('\n  ANTHROPIC_API_KEY를 설정하세요. 두 가지 방법 중 하나:');
  console.error('  1) .env 파일에 작성: ANTHROPIC_API_KEY=sk-ant-...');
  console.error('  2) 환경변수: set ANTHROPIC_API_KEY=sk-ant-... && node server.cjs\n');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API proxy
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsed = JSON.parse(body);

      const postData = JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 4096,
        system: parsed.system || '',
        messages: parsed.messages || [],
      });

      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const apiReq = https.request(options, apiRes => {
        res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
        apiRes.pipe(res);
      });

      apiReq.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });

      apiReq.write(postData);
      apiReq.end();
    });
    return;
  }

  // Serve static HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const filePath = path.join(__dirname, 'index.standalone.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n  VibeCheck 서버 실행 중: http://localhost:${PORT}`);
  console.log(`  모델: Claude Opus 4.6\n`);
});
