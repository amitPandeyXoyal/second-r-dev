const { Router } = require('express');
const { readUsers, findUserById, saveUser } = require('../services/userService');
const { asyncHandler } = require('../util/wrap');

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const users = await readUsers();
  res.json({ users });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const user = await findUserById(id);
  if (!user) {
    res.status(404).json({ error: 'User not found', requestId: req.requestId });
    return;
  }
  res.json({ user });
}));

router.post('/', asyncHandler(async (req, res) => {
  const name = req.body && req.body.name;
  if (!name) {
    res.json({ error: 'name required' });
    return;
  }
  const created = await saveUser({ name });
  res.status(201).json({ user: created });
}));

module.exports = router;


