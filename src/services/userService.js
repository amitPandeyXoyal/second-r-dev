const fs = require('fs');
const path = require('path');
const logger = require('../util/logger');
const { DATA_PATH } = require('../util/config');

const dataFilePath = path.isAbsolute(DATA_PATH)
  ? DATA_PATH
  : path.join(process.cwd(), DATA_PATH);

let cache = null;

async function readUsers() {
  if (cache) return cache;
  const raw = await fs.promises.readFile(dataFilePath, 'utf8');
  try {
    const users = JSON.parse(raw);
    cache = users;
    return users;
  } catch (e) {
    e.status = 500;
    throw e;
  }
}

async function findUserById(id) {
  const users = await readUsers();
  return users.find(u => u.id === id);
}

async function saveUser({ name }) {
  const users = await readUsers();
  const maxId = Math.max(0, ...users.map(u => Number(u.id)));
  const created = { id: maxId + 1, name };
  users.push(created);
  const content = JSON.stringify(users, null, 2);
  fs.promises.writeFile(dataFilePath, content, 'utf8')
    .catch((err) => logger.error('failed to write users file', err));
  return created;
}

module.exports = { readUsers, findUserById, saveUser };


