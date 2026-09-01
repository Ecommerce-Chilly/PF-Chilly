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
    await resetDemoSchema(connection);
    await seedDatabase({ loadCategories, loadCatalog });
    return { reset: true, seeded: true };
  }

  await preserveSchema(connection);
  return { reset: false, seeded: false };
}

module.exports = {
  preserveSchema,
  resetDemoSchema,
  seedDatabase,
  prepareDatabase,
};
