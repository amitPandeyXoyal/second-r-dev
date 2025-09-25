# Bug Hunt: Node.js Debugging Exercise (JS Only)

## What You Get

- **Express server**: `src/server.js`, `src/app.js`
- **Middleware**: `src/middleware/*`
- **Routes**:
  - Users (`src/routes/users.js`)
  - Math (`src/routes/math.js`)
  - System (`src/routes/system.js`)
  - Files (`src/routes/files.js`)
- **Utilities**: `src/util/*` (config, logger, wrapper)
- **Data file**: `data/users.json`
- **Config file**: `config/config.json`
- **Sample logs**: `logs/app.log`

## Setup

1. Clone the repo
2. Node.js v18+ recommended
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in dev mode with inspector:
   ```bash
   npm run dev
   ```

## Environment

You can create a `.env` file to set variables:

```env
PORT=4000
DATA_PATH=data/users.json
LOG_LEVEL=debug
AUTH_ENABLED=true
AUTH_SECRET=mysecret
```

⚠️ **Note**: The current code may not respect `.env` in all cases. There is also a `config/config.json` file that may override environment settings. Part of the challenge is to make environment configuration effective consistently and understand the precedence order.

## Endpoints

- `GET /` → Health check (requires auth)
- `GET /users` → List users (requires auth)
- `GET /users/:id` → Get user by ID (requires auth)
- `POST /users` → Create user `{ "name": "Alice" }` (requires auth)
- `GET /math/sum?a=1&b=2` → Compute sum (requires auth)
- `POST /math/divide` → Divide `{ "a": 4, "b": 2 }` (requires auth)
- `GET /system/stats` → System info (requires auth)
- `GET /files/stream?path=...` → Stream a file (requires auth)
- `GET /files/concat?files=a,b` → Concatenate files (requires auth)

## Authentication

All routes require a Bearer token in the Authorization header.

**Token format**: `Bearer token-{AUTH_SECRET}-{day_of_month}`

### How to Generate a Token

1. Check your `AUTH_SECRET`:
   - From `config/config.json`, or
   - From `.env` (`AUTH_SECRET`)

2. Get today's day number: (1–31)
   ```bash
   node -e "console.log(new Date().getDate())"
   ```

3. Format: `token-{SECRET}-{DAY}`

### Examples

- If `AUTH_SECRET = "shh"` and today is the 15th → `token-shh-15`
- If `AUTH_SECRET = "mysecret"` and today is the 3rd → `token-mysecret-3`

### Quick Test

```bash
curl -H "Authorization: Bearer token-shh-15" http://localhost:3000/
```

⚠️ **Note**: The token changes daily. You must regenerate or adjust it each day.

## Known Symptoms (Debugging Targets)

- `.env` settings don't always apply (port, log level, data path)
- `POST /users` sometimes returns "name required" even with a valid JSON body
- `GET /users/:id` fails to find existing users by valid ID
- `GET /math/sum` performs string concatenation instead of numeric addition
- `POST /math/divide` returns Infinity, NaN, or 500 errors in edge cases

## Additional Symptoms (New Features to Fix)

- All routes return 401 Unauthorized even with valid tokens
- `GET /files/stream` crashes the server when the file doesn't exist or the path is invalid
- `GET /files/concat` returns empty content or crashes with certain file combinations

👉 **Both file APIs should return proper error responses instead of crashing.**

## Sample cURL Requests

### Concat files (with one missing file):
```bash
curl -H "Authorization: Bearer ..." \
  "http://localhost:3000/files/concat?files=package.json,nonexistent.txt"
```

### Stream file:
```bash
curl -H "Authorization: Bearer ..." \
  "http://localhost:3000/files/stream?path=data/users.json"
```
