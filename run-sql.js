const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
async function run() {
  try {
    await pool.query(`DROP INDEX IF EXISTS "IDX_session_expire";`);
    await pool.query(`DROP INDEX IF EXISTS "session_pkey";`);
    await pool.query(`DROP TABLE IF EXISTS "session" CASCADE;`);
    await pool.query(`
      CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY,
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      );
      CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    `);
    console.log("OK!");
  } catch(e) { console.error(e); }
  await pool.end();
}
run();
