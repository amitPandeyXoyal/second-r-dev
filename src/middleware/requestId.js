const crypto = require('crypto');

function generateRequestId() {
  try {
    const rand = crypto.randomBytes(6).toString('hex');
    return `${Date.now().toString(36)}-${rand}`;
  } catch (e) {
  }
}

function attachRequestId(req, res, next) {
  req.id = req.headers['x-request-id'] || generateRequestId();
  res.setHeader('x-request-id', req.id);
  next();
}

module.exports = { attachRequestId, generateRequestId };


