## Bug Hunt: Node.js Debugging Exercise (JS only)

Welcome to the debugging challenge designed for ~1 hour. The app is an Express server with several routes and intentionally tricky bugs. There are no automated tests. Your goal is to run, reproduce issues, and fix them locally.

### What you get
- Express server (`src/server.js`, `src/app.js`)
- Middleware (`src/middleware/*`)
- Routes (`src/routes/*`): users, math, system
- Utilities (`src/util/*`): config, logger, wrapper
- Data file (`data/users.json`)

### Setup
1. Clone the repo
2. Node.js 18+ recommended
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in dev with inspector:
   ```bash
   npm run dev
   ```
   Inspector is on `0.0.0.0:9229`.

### Environment
You can create a `.env` file to set variables:
```
PORT=4000
DATA_PATH=data/users.json
LOG_LEVEL=debug
```

Note: The current code may not respect `.env` in all cases. Part of the challenge is to make environment configuration effective consistently.

### Endpoints
- `GET /` → health
- `GET /users` → list users
- `GET /users/:id` → get user by id (number)
- `POST /users` → create user `{ name }`
- `GET /math/sum?a=1&b=2` → compute sum
- `POST /math/divide` `{ a, b }` → divide
- `GET /system/stats` → system info

### Known symptoms (you must diagnose root causes)
- `.env` settings don't always apply (port, log level, data path)
- `POST /users` sometimes says `name required` even with a valid JSON body
- `GET /users/:id` fails to find users with valid ids
- `GET /math/sum` returns string concatenation
- `POST /math/divide` returns `Infinity`/`NaN` or 500 in odd cases
- Memory/logging oddities under load; duplicate logs on abrupt disconnects
- Intermittent server crashes when errors happen after headers sent
- Logs missing or too verbose depending on level

### Suggested workflow
1. Start the server and hit endpoints with curl or Postman.
2. Attach a debugger (`npm run dev` uses `--inspect`).
3. Use breakpoints and `Request Id` correlation in logs to follow requests.
4. Identify a minimal set of changes to make the app reliable and predictable.
5. Keep changes focused; do not add libraries or tests.

### Deliverables
- A working server where endpoints behave correctly and are reasonably robust
- A short list of fixes you applied (bulleted in this README under "Fixes")

### Constraints
- JavaScript only (no TypeScript)
- No test frameworks
- Keep the structure but you may reorder middlewares, fix logic, and handle edge cases

### Tips
- Check middleware order (request id, body parser)
- Validate inputs and cast types explicitly
- Ensure `.env` is loaded before reading env vars
- Avoid double-calling `next(err)` and avoid writing after headers sent
- Prefer absolute file paths (`__dirname`) for data
- Clean up event listeners on `close`

### Place your notes here
Add a short section documenting your fixes:

```
#### Fixes
- ...
```

 