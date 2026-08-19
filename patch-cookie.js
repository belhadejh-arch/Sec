const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// Replace standard session cookie config to allow iframe authentication
code = code.replace(
  /cookie: \{([^}]*)\}/g,
  `cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }`
);

fs.writeFileSync('server.js', code);
console.log('Patched server.js cookies');
