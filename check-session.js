const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
async function check() {
  const res = await pool.query("SELECT * FROM user_sessions");
  console.log("Sessions in DB:", res.rowCount);
  pool.end();
}
check();
