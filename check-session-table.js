const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
async function check() {
  try {
    const res = await pool.query("SELECT to_regclass('session');");
    console.log("Session table exists:", res.rows[0].to_regclass);
  } catch(e) {
    console.error(e);
  }
  await pool.end();
}
check();
