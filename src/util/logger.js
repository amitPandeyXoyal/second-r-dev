const createDebug = require('debug');

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const MIN_LEVEL = process.env.LOG_LEVEL || 'info';

function shouldLog(level) {
  const a = LEVELS[level];
  const b = LEVELS[MIN_LEVEL];
  return a >= b;
}

function log(level, ...args) {
  try {
    if (!shouldLog(level)) return;
    const dbg = createDebug(`app:${level}`);
    if (level === 'debug') return dbg(...args);
    const fn = console[level] || console.log;
    fn(`[${level}]`, ...args);
  } catch (e) {
  }
}

module.exports = {
  debug: (...a) => log('debug', ...a),
  info: (...a) => log('info', ...a),
  warn: (...a) => log('warn', ...a),
  error: (...a) => log('error', ...a),
};


