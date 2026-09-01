const { Product, Category, Inventory } = require('../db');
const cases = require('../dataApi/case.json');
const casesFan = require('../dataApi/cases_fan.json');
const cpuFan = require('../dataApi/cpu_fan.json');
const gpu = require('../dataApi/gpu.json');
const keyboard = require('../dataApi/keyboard.json');
const motherboard = require('../dataApi/motherboard.json');
const mouses = require('../dataApi/mouses.json');
const powerSupply = require('../dataApi/power_supply.json');
const processor = require('../dataApi/processor.json');
const ram = require('../dataApi/ram.json');
const storage = require('../dataApi/storage.json');
const { defaultDiscount } = require('./discounts/defaultDiscount');

const catalogSources = [
  ['cases', cases, ['sidePanel', 'color', 'cabinetType']],
  ['motherboards', motherboard, ['formFactor', 'chipset', 'memorySlots', 'socketType']],
  ['mouses', mouses, ['trackingMethod', 'color', 'wireless']],
  ['case_fan', casesFan, ['rpm', 'airFlow', 'noiseLevel']],
  ['cpu_fan', cpuFan, ['rpm', 'color', 'noiseLevel']],
  ['gpus', gpu, ['storageInterface', 'memory', 'clockSpeed', 'chipset']],
  ['keyboards', keyboard, ['style', 'backlit', 'color', 'wireless']],
  ['power_supply', powerSupply, ['power', 'color', 'efficiency']],
  ['processors', processor, ['speed', 'socketType']],
  ['ram', ram, ['size', 'quantity', 'type']],
  ['storage', storage, ['rpm', 'type', 'cacheMemory']],
];

function normalizeValue(value) {
  return value === undefined ? null : value;
}

function buildCatalogRecords(discountName = 'JoseMa') {
  return catalogSources.flatMap(([categoryName, products, detailNames]) =>
    products.map((product) => {
      const details = {};
      detailNames.forEach((name) => {
        if (product[name] !== undefined) details[name] = product[name];
      });

      return {
        name: product.title,
        image: normalizeValue(product.img),
        price: Number(product.price) === 0 ? 50 : Number(product.price),
        brand: normalizeValue(product.brand),
        model: normalizeValue(product.model),
        details: [details],
        categoryName,
        discountName,
      };
    })
  );
}

function catalogFingerprint(product) {
  return JSON.stringify({
    name: product.name,
    image: normalizeValue(product.image),
    price: Number(product.price),
    brand: normalizeValue(product.brand),
    model: normalizeValue(product.model),
    details: product.details,
    categoryName: product.categoryName,
    discountName: product.discountName,
  });
}

function missingCatalogRecords(seedRecords, existingProducts) {
  const existingCounts = new Map();
  existingProducts.forEach((product) => {
    const key = catalogFingerprint(product);
    existingCounts.set(key, (existingCounts.get(key) || 0) + 1);
  });

  return seedRecords.filter((record) => {
    const key = catalogFingerprint(record);
    const available = existingCounts.get(key) || 0;
    if (available === 0) return true;
    existingCounts.set(key, available - 1);
    return false;
  });
}

async function hardCodeoInfo({ transaction } = {}) {
  const discount = await defaultDiscount({ transaction });
  const categories = await Category.findAll({ transaction });
  const categoryNames = new Set(categories.map((category) => category.name));
  const seedRecords = buildCatalogRecords(discount.name);
  const missingCategory = seedRecords.find(
    (record) => !categoryNames.has(record.categoryName)
  );
  if (missingCategory) {
    throw new Error(`Missing seed category: ${missingCategory.categoryName}`);
  }

  const existingProducts = await Product.findAll({
    paranoid: false,
    transaction,
  });
  const recordsToCreate = missingCatalogRecords(seedRecords, existingProducts);

  for (const record of recordsToCreate) {
    const inventory = await Inventory.create(
      { quantity: 12 },
      { transaction }
    );
    const product = await Product.create(
      { ...record, inventoryId: inventory.id },
      { transaction }
    );
    await inventory.update({ productId: product.id }, { transaction });
  }

  return {
    total: seedRecords.length,
    created: recordsToCreate.length,
    existing: seedRecords.length - recordsToCreate.length,
  };
}

module.exports = {
  buildCatalogRecords,
  catalogFingerprint,
  missingCatalogRecords,
  hardCodeoInfo,
};
