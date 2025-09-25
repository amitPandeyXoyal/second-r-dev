const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/stream', (req, res, next) => {
  const p = req.query.path || '';
  const abs = path.resolve(process.cwd(), p);
  const stream = fs.createReadStream(abs);
  stream.pipe(res);
  // BUG: No error handling - will crash server on invalid files
  // stream.on('error', (err) => {
  //   next(err);
  // });
});

router.get('/concat', async (req, res, next) => {
  try {
    const list = String(req.query.files || '').split(',').filter(Boolean);
    const contents = await Promise.all(
      list.map((f) => fs.promises.readFile(path.resolve(process.cwd(), f), 'utf8'))
    );
    res.type('text/plain').send(contents.join('\n'));
  } catch (e) {
    // BUG: Swallows error and returns empty response instead of proper error
    res.type('text/plain').send('');
  }
});

module.exports = router;