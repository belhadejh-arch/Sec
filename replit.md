# Tarnoy

## Project overview

Tarnoy is an Arabic Node.js/Express application with a PostgreSQL database. The
backend exposes the `/api` routes and the static frontend is in `attached_assets/`.

## Deployment layout

The currently requested hosting target is Netlify for both the static frontend
and Express API. PostgreSQL remains on Neon; Netlify runs the API as a Function.

### Full-stack Netlify deployment

- Repository root is the Base directory.
- Build command: `npm ci --no-audit --no-fund && npm run build`
- Publish directory: `attached_assets`
- Functions directory: `netlify/functions`
- `netlify/functions/api.js` wraps the existing Express app for Netlify Functions.
- `/api/*` is rewritten to that function by `attached_assets/_redirects`.
- Netlify environment variables must include `NEON_DATABASE_URL`,
  `SESSION_SECRET`, `NODE_ENV=production`, `FRONTEND_URL` (Netlify/custom origins),
  and `COOKIE_SAME_SITE=none`.
- PostgreSQL remains on Neon; it is not migrated into Netlify.

### Existing Render + Vercel alternative

The project can still run as a Render backend plus Vercel static frontend using
`render.yaml` and `attached_assets/vercel.json`. This is an alternative; do not
point the Netlify API rewrite back to Render for the all-in-Netlify setup.

## Local commands

Backend:

```bash
npm install
npm run build
NEON_DATABASE_URL='postgresql://...' SESSION_SECRET='local-secret' npm start
```

Frontend validation:

```bash
cd attached_assets
npm install
npm run build
```

## Server-owned financial and reward state

The browser is never trusted to write `balance`, withdrawal reservations, VIP
membership, task progress, daily rewards, referral commissions, or wheel spins.
Those values are changed only by authenticated backend transactions:

- `POST /api/deposit-requests` creates a pending request; an admin approval
  credits the user and creates referral commissions.
- `POST /api/withdrawal-requests` creates a pending request and reserves the
  amount. Admin approval debits it; rejection releases the reservation.
- `POST /api/rewards/daily`, `/api/vip/trial`, `/api/vip/purchase`, and
  `/api/wheel/spin` perform their checks and balance changes on the server.
- `/api/tasks/:taskIndex/start` and `/complete` use `task_attempts`; the server
  validates membership, order, one attempt per day, comment, and the 10-second
  minimum duration.
- Each successful paid VIP activation increments `users.available_spins` and
  records exactly one `vip_activation` grant in `wheel_spin_grants` within the
  same PostgreSQL transaction. `/api/wheel/spin` locks the user row and
  atomically consumes one persisted opportunity before crediting any prize.

## Tarnoy platform settings

Run `npm run db:init` against the intended database after schema changes. This
adds editable TRC20/BEP20 wallet settings and persisted wheel prize odds, keeps
the existing TRC20 address, and applies the published VIP daily totals to paid
membership snapshots without changing account balances or task counts.

After schema changes, run `npm run db:init` against the intended Neon database.