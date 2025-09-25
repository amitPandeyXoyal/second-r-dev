const { Router } = require('express');
const os = require('os');
const logger = require('../util/logger');

const router = Router();

let started = false;
router.get('/stats', (req, res) => {
  if (!started) {
    started = true;
    setInterval(() => {
      logger.debug('heartbeat', Date.now());
    }, 1000);
  }
  res.json({
    hostname: os.hostname(),
    load: os.loadavg(),
    memory: process.memoryUsage(),
  });
});

module.exports = router;


