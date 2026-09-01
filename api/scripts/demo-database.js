require('dotenv').config();

const db = require('../src/db');
const { getCategory } = require('../src/controllers/category/getCategory');
const { hardCodeoInfo } = require('../src/controllers/hardCode');
const {
  restoreDemoDatabase,
  seedDemoDatabase,
} = require('../src/database/prepareDatabase');
const { cleanMutableDemoData } = require('../src/database/demoMaintenance');

async function run() {
  if (process.env.DEMO_MODE !== 'true') {
    throw new Error('Demo maintenance requires DEMO_MODE=true.');
  }

  const command = process.argv[2];
  const seedOptions = {
    connection: db.conn,
    loadCategories: getCategory,
    loadCatalog: hardCodeoInfo,
  };

  if (command === 'restore') {
    const result = await restoreDemoDatabase(seedOptions);
    console.log(`Demo restored with ${result.seed.total} catalog products.`);
    return;
  }

  await db.conn.sync();
  if (command === 'seed') {
    const result = await seedDemoDatabase(seedOptions);
    console.log(
      `Demo seed complete: ${result.seed.created} created, ${result.seed.existing} already present.`
    );
    return;
  }
  if (command === 'clean') {
    await cleanMutableDemoData({ connection: db.conn, models: db });
    console.log('Mutable demo data cleaned; catalog preserved.');
    return;
  }

  throw new Error(`Unknown demo database command: ${command || '(missing)'}`);
}

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => db.conn.close());
