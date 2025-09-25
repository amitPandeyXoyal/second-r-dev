const logger = require('../util/logger');

function requestLogger(req, res, next) {
  const start = Date.now();
  logger.info(`--> ${req.method} ${req.originalUrl} id=${req.id}`);

  function onFinish() {
    const ms = Date.now() - start;
    logger.info(`<-- ${req.method} ${req.originalUrl} id=${req.id} ${res.statusCode} ${ms}ms`);
  }
  res.on('finish', onFinish);
  res.on('close', () => {
    logger.warn(`xx> ${req.method} ${req.originalUrl} id=${req.id} closed`);
  });
  next();
}

module.exports = { requestLogger };


