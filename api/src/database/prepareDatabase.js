// These functions receive dependencies so their ordering can be tested without
// opening a database connection or deleting any real demo data.
async function resetDemoSchema(connection) {
  // Intentional legacy demo policy. Environment guards belong to phase 4B.
  await connection.sync({ force: true });
}

async function seedDatabase({ loadCategories, loadCatalog }) {
  await loadCategories();
  await loadCatalog();
}

async function prepareDatabase({ connection, loadCategories, loadCatalog }) {
  await resetDemoSchema(connection);
  await seedDatabase({ loadCategories, loadCatalog });
}

module.exports = { resetDemoSchema, seedDatabase, prepareDatabase };
