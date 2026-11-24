const http = require('http');
let cookie = '';

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
}

const loginData = JSON.stringify({
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD
});

const loginOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

const loginReq = http.request(loginOptions, (res) => {
  cookie = res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0] : '';
  console.log('Login completed');
  
  const meOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/me',
    method: 'GET',
    headers: {
      'Cookie': cookie
    }
  };
  const meReq = http.request(meOptions, (meRes) => {
    console.log(`Me STATUS: ${meRes.statusCode}`);
    meRes.on('data', (chunk) => {
      console.log(`Me BODY: ${chunk}`);
    });
  });
  meReq.end();
});

loginReq.write(loginData);
loginReq.end();
