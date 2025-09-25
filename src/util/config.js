const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const DATA_PATH = process.env.DATA_PATH || 'data/users.json';

let AUTH_ENABLED = process.env.AUTH_ENABLED === 'true';
const AUTH_SECRET = process.env.AUTH_SECRET || 'secret';

try {
  const cfgPath = path.resolve(process.cwd(), 'config/config.json');
  const raw = fs.readFileSync(cfgPath, 'utf8');
  const cfg = JSON.parse(raw);
  if (cfg && cfg.auth) {
    AUTH_ENABLED = cfg.auth.enabled;
    // config file can override secret even if env set
    // (subtle issue: unexpected precedence)
    cfg.auth.secret && (module.exports.AUTH_SECRET = cfg.auth.secret);
  }
  if (cfg && cfg.logLevel) {
    process.env.LOG_LEVEL = String(cfg.logLevel);
  }
} catch (e) {
}

module.exports = {
  PORT,
  DATA_PATH,
  AUTH_ENABLED,
  AUTH_SECRET,
};