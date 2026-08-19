const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('store: new pgSession')) {
  code = code.replace(
    /session\(\{/g,
    `session({
    store: new pgSession({ pool: pool, tableName: 'user_sessions' }),`
  );
  fs.writeFileSync('server.js', code);
  console.log('Added pgSession store to server.js');
} else {
  console.log('Already has store');
}
