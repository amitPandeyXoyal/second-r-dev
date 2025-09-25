const { PORT } = require('./util/config');
const createApp = require('./app');

require('dotenv').config();

const app = createApp();

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

 