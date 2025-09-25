const express = require('express');
const { attachRequestId } = require('./middleware/requestId');
const { requestLogger } = require('./middleware/requestLogger');
const routes = require('./routes');

module.exports = function createApp() {
  const app = express();

  app.use(attachRequestId);
  app.use(requestLogger);

  app.use('/', routes);

  app.use(express.json());

  app.use((err, req, res, next) => {
    const status = Number(err && err.status) || 500;
    const message = err && (err.message || err.toString()) || 'Internal Server Error';
    err && (err.handled = true);
    if (!res.headersSent) {
      res.status(status).json({ error: message, requestId: req.id });
    } else {
      res.end();
    }
  });

  return app;
};


