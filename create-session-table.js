const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function createTable() {
  await pool.query(`DROP TABLE IF EXISTS "session";`);
  await pool.query(`
    CREATE TABLE "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
    );
    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  `);
  console.log("Session table created perfectly");
  await pool.end();
}
createTable().catch(e => {
  console.error(e);
  pool.end();
});
