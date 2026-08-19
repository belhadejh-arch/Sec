const http = require('http');
let cookie = '';

const loginOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const loginReq = http.request(loginOptions, (res) => {
  cookie = res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0] : '';
  console.log(`Login Set-Cookie: ${cookie}`);
  
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

loginReq.write(JSON.stringify({ email: 'admin@securo.com', password: 'adminpassword123' }));
loginReq.end();
