const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function test() {
  const result = await pool.query("SELECT * FROM users WHERE email = 'admin@securo.com'");
  const user = result.rows[0];
  if (!user) return console.log("User not found");
  console.log("User exists:", user.email);
  const match = await bcrypt.compare("adminpassword123", user.password_hash);
  console.log("Password match:", match);
  await pool.end();
}
test();
