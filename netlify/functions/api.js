process.env.NODE_ENV = "production";
process.env.NETLIFY = "true";

const serverless = require("serverless-http");
const app = require("../../server");

const expressHandler = serverless(app);
const functionPath = "/.netlify/functions/api";

function normalizeApiPath(pathname) {
  let normalizedPath = String(pathname || "/");

  if (normalizedPath.startsWith(functionPath)) {
    normalizedPath = normalizedPath.slice(functionPath.length) || "/";
  }
  if (!normalizedPath.startsWith("/")) normalizedPath = `/${normalizedPath}`;
  if (normalizedPath === "/" || normalizedPath === "/api") return normalizedPath;
  return normalizedPath.startsWith("/api/")
    ? normalizedPath
    : `/api${normalizedPath}`;
}

exports.handler = (event, context) => {
  const currentPath =
    event.requestPath || event.rawPath || event.path || "/";
  const normalizedPath = normalizeApiPath(currentPath);
  const normalizedEvent = {
    ...event,
    requestPath: normalizedPath,
  };

  if (event.version === "2.0") {
    normalizedEvent.rawPath = normalizedPath;
  } else {
    normalizedEvent.path = normalizedPath;
  }

  return expressHandler(normalizedEvent, context);
};
