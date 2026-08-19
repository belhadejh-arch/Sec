---
name: Imported app runtime
description: Non-obvious runtime setup constraints for imported Express projects in this workspace
---

The Replit webview workflow expects the Express server to listen on the injected `PORT` value, with a suitable local default for web previews. Imported npm projects may also need an explicit npmjs registry install when the package firewall cannot resolve a locked tarball.

**Why:** A server hardcoded to another port makes the workflow appear broken even when the application is healthy, and a failed dependency install prevents all routes from starting.

**How to apply:** Check the workflow's `waitForPort` against the server's listen call before debugging application routes; install dependencies with the project's lockfile and an explicit public npm registry only when the managed package installer cannot resolve the package.