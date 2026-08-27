const apiUrl = (process.env.API_URL || 'http://localhost:3001').replace(/\/$/, '');

async function getJson(path) {
  const response = await fetch(`${apiUrl}${path}`, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }

  return response.json();
}

async function run() {
  const health = await getJson('/health');
  if (health.status !== 'ok' || health.database !== 'connected') {
    throw new Error('/health returned an unexpected response');
  }

  const products = await getJson('/product');
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('/product did not return seeded products');
  }

  console.log(`Smoke check passed: API healthy, ${products.length} products.`);
}

run().catch((error) => {
  console.error(`Smoke check failed: ${error.message}`);
  process.exitCode = 1;
});
