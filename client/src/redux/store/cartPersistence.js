const CART_STORAGE_KEY = 'cart';

const getBrowserStorage = () =>
  typeof window === 'undefined' ? null : window.localStorage;

const normalizeQuantity = quantity => {
  const parsedQuantity = Number(quantity);
  return Number.isFinite(parsedQuantity) && parsedQuantity > 0
    ? Math.floor(parsedQuantity)
    : 1;
};

export const normalizeCart = cart => {
  if (!Array.isArray(cart)) return [];

  return cart
    .filter(item => item && item.id !== undefined && item.id !== null)
    .map(item => ({
      ...item,
      quantity: normalizeQuantity(item.quantity),
    }));
};

export const loadCart = (storage = getBrowserStorage()) => {
  if (!storage) return [];

  try {
    const storedCart = storage.getItem(CART_STORAGE_KEY);
    return storedCart ? normalizeCart(JSON.parse(storedCart)) : [];
  } catch {
    storage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

export const saveCart = (cart, storage = getBrowserStorage()) => {
  if (!storage) return;

  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(cart)));
  } catch {
    // A blocked or full storage must not prevent the cart from working in memory.
  }
};

export const mergeBackendCart = (localCart, backendItems, products) => {
  const mergedCart = new Map(
    normalizeCart(localCart).map(item => [String(item.id), item])
  );
  const productsById = new Map(
    (Array.isArray(products) ? products : []).map(product => [
      String(product.id),
      product,
    ])
  );

  for (const backendItem of Array.isArray(backendItems) ? backendItems : []) {
    const product = productsById.get(String(backendItem.productId));
    if (!product) continue;

    mergedCart.set(String(product.id), {
      ...product,
      quantity: normalizeQuantity(backendItem.quantity),
    });
  }

  return [...mergedCart.values()];
};
