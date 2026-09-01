const { withDemoLock } = require('./demoMaintenance');

// These functions receive dependencies so their ordering can be tested without
// opening a database connection or deleting any real demo data.
async function resetDemoSchema(connection, transaction) {
  // Intentional legacy demo policy. Environment guards belong to phase 4B.
  const options = { force: true };
  if (transaction) options.transaction = transaction;
  await connection.sync(options);
}

async function seedDatabase({ loadCategories, loadCatalog, transaction }) {
  await loadCategories({ transaction });
  return loadCatalog({ transaction });
}

async function restoreDemoDatabase({ connection, loadCategories, loadCatalog }) {
  return withDemoLock(connection, async (transaction) => {
    await resetDemoSchema(connection, transaction);
    const seed = await seedDatabase({
      loadCategories,
      loadCatalog,
      transaction,
    });
    return { reset: true, seeded: true, seed };
  });
}

async function seedDemoDatabase({ connection, loadCategories, loadCatalog }) {
  return withDemoLock(connection, async (transaction) => {
    const seed = await seedDatabase({
      loadCategories,
      loadCatalog,
      transaction,
    });
    return { reset: false, seeded: true, seed };
  });
}

async function preserveSchema(connection) {
  await connection.sync();
}

async function prepareDatabase({
  connection,
  loadCategories,
  loadCatalog,
  demoMode = false,
  resetDbOnStart = false,
}) {
  if (resetDbOnStart && !demoMode) {
    throw new Error(
      'Refusing to reset the database outside demo mode.'
    );
  }

  if (resetDbOnStart) {
    return restoreDemoDatabase({ connection, loadCategories, loadCatalog });
  }

  await preserveSchema(connection);
  return { reset: false, seeded: false };
}

module.exports = {
  preserveSchema,
  resetDemoSchema,
  seedDatabase,
  seedDemoDatabase,
  restoreDemoDatabase,
  prepareDatabase,
};
