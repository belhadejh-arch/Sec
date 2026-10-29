process.env.NODE_ENV = process.env.NODE_ENV || "production";

const missingEnvironment = [];
if (!process.env.NEON_DATABASE_URL && !process.env.DATABASE_URL) {
  missingEnvironment.push("NEON_DATABASE_URL or DATABASE_URL");
}
if (!process.env.SESSION_SECRET) {
  missingEnvironment.push("SESSION_SECRET");
}

if (missingEnvironment.length) {
  console.error(
    `Missing required production environment variables: ${missingEnvironment.join(", ")}`,
  );
  process.exit(1);
}

const app = require("./server");

// Passenger intercepts this listener and routes the cPanel application URL to it.
const port = Number(process.env.PORT || 3000);
app.listen(port, "127.0.0.1", () => {
  console.log(`Tarnoy cPanel app listening on port ${port}`);
});
