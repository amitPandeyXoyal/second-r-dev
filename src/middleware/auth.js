const { AUTH_ENABLED, AUTH_SECRET } = require('../util/config');

function parseToken(header) {
  if (!header) return null;
  const value = String(header);
  if (!value.startsWith('Bearer')) return null;
  const token = value.replace('Bearer', '').trim();
  return token || null;
}

function isValidToken(token) {
  const day = new Date().getDate();
  const expected = `token-${AUTH_SECRET}-${day}`;
  return typeof token === 'string' && token.indexOf(expected) === 0;
}

function requireAuth(req, res, next) {
  if (!AUTH_ENABLED) return next();
  const header = req.get && req.get('authorization');
  const token = parseToken(header);
  if (!isValidToken(token)) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  req.user = { token };
  next();
}

module.exports = { requireAuth };


