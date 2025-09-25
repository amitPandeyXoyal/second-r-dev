const { Router } = require('express');
const { asyncHandler } = require('../util/wrap');

const router = Router();

router.get('/sum', asyncHandler(async (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const result = a + b;
  res.json({ result });
}));

router.post('/divide', asyncHandler(async (req, res) => {
  const { a, b } = req.body || {};
  const result = a / b;
  res.json({ result });
}));

module.exports = router;


