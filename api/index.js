require('dotenv').config();

const { readEnvironment } = require('./src/config/env');

const { port } = readEnvironment();
const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getCategory } = require('./src/controllers/category/getCategory');
const { hardCodeoInfo } = require('./src/controllers/hardCode');
const { prepareDatabase } = require('./src/database/prepareDatabase');
const { createServerLifecycle } = require('./src/server');

const { startServer, stopServer } = createServerLifecycle({
  app,
  port,
  connection: conn,
  prepareDatabase: () => prepareDatabase({
    connection: conn,
    loadCategories: getCategory,
    loadCatalog: hardCodeoInfo,
  }),
});

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
