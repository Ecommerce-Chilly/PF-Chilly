require('dotenv').config();

const { readEnvironment } = require('./src/config/env');

const { port } = readEnvironment();
const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getCategory } = require('./src/controllers/category/getCategory');
const { hardCodeoInfo } = require('./src/controllers/hardCode');

let server;

async function startServer() {
  // Resetting the database is intentional while Chilly is used as a demo.
  await conn.sync({ force: true });
  await getCategory();
  await hardCodeoInfo();

  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
    server.once('error', reject);
  });
}

async function stopServer(signal) {
  if (signal) console.log(`Received ${signal}. Closing server.`);

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  await conn.close();
}

if (require.main === module) {
  startServer().catch(async (error) => {
    console.error('Unable to start the API:', error.message);
    await conn.close().catch(() => {});
    process.exitCode = 1;
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.once(signal, () => {
      stopServer(signal)
        .catch((error) => console.error('Unable to stop the API:', error.message))
        .finally(() => process.exit());
    });
  });
}

module.exports = { startServer, stopServer };
