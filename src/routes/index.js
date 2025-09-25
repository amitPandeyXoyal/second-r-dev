const { Router } = require('express');
const users = require('./users');
const math = require('./math');
const system = require('./system');
const files = require('./files');

const router = Router();

router.use('/users', users);
router.use('/math', math);
router.use('/system', system);
router.use('/files', files);

router.get('/', (req, res) => {
  res.json({ ok: true, requestId: req.requestId || req.id });
});

module.exports = router;


