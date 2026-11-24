const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!dbUrl || !adminEmail || !adminPassword) {
  throw new Error("NEON_DATABASE_URL or DATABASE_URL, ADMIN_EMAIL, and ADMIN_PASSWORD are required");
}

const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function test() {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [adminEmail]);
  const user = result.rows[0];
  if (!user) return console.log("User not found");
  console.log("User exists");
  const match = await bcrypt.compare(adminPassword, user.password_hash);
  console.log("Password match:", match);
  await pool.end();
}
test();
