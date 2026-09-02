import reducer from './redux/reducer/reducer';
import {
  ADD_TO_CART,
  CLEAR_DELETED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_FROM_CART_BACK2,
  LS_TO_CART,
  LOGOUT,
  ORDER_BY_PRICE,
  PRODUCTS_DELETED,
} from './redux/actions/actions';
import {
  loadCart,
  mergeBackendCart,
  saveCart,
} from './redux/store/cartPersistence';

test('stores the complete product catalogue', () => {
  const products = [{ id: 1 }, { id: 2 }];
  const state = reducer(undefined, { type: GET_ALL_PRODUCTS, payload: products });

  expect(state.product).toEqual(products);
  expect(state.allProduct).toEqual(products);
});

test('shows search results without replacing the complete catalogue', () => {
  const catalogue = [{ id: 1 }, { id: 2 }];
  const initialState = reducer(undefined, {
    type: GET_ALL_PRODUCTS,
    payload: catalogue,
  });
  const results = [{ id: 2 }];
  const state = reducer(initialState, {
    type: GET_PRODUCT_BY_NAME,
    payload: results,
  });

  expect(state.product).toEqual(results);
  expect(state.allProduct).toEqual(catalogue);
});

test('sorts the visible products without mutating the previous state', () => {
  const catalogue = [
    { id: 1, price: 10 },
    { id: 2, price: 30 },
  ];
  const initialState = reducer(undefined, {
    type: GET_ALL_PRODUCTS,
    payload: catalogue,
  });
  const state = reducer(initialState, { type: ORDER_BY_PRICE, payload: 'Asc' });

  expect(state.product.map((product) => product.id)).toEqual([2, 1]);
  expect(initialState.product.map((product) => product.id)).toEqual([1, 2]);
});

test('restores cart contents and quantity from browser storage', () => {
  const storage = {
    value: JSON.stringify([{ id: 1, name: 'CPU', quantity: 2 }]),
    getItem() {
      return this.value;
    },
    setItem(_key, value) {
      this.value = value;
    },
    removeItem() {
      this.value = null;
    },
  };

  const storedCart = loadCart(storage);
  const state = reducer(undefined, { type: LS_TO_CART, payload: storedCart });

  expect(state.cart).toEqual([{ id: 1, name: 'CPU', quantity: 2 }]);
  expect(state.quantity).toBe(2);

  saveCart([{ id: 2, quantity: 3 }], storage);
  expect(JSON.parse(storage.value)).toEqual([{ id: 2, quantity: 3 }]);
});

test('merges the backend cart without duplicating locally restored products', () => {
  const localCart = [
    { id: 1, name: 'CPU', quantity: 1 },
    { id: 2, name: 'RAM', quantity: 2 },
  ];
  const products = [
    { id: 1, name: 'CPU' },
    { id: 2, name: 'RAM' },
  ];
  const mergedCart = mergeBackendCart(
    localCart,
    [{ productId: 1, quantity: 4 }],
    products
  );
  const catalogueState = reducer(undefined, {
    type: GET_ALL_PRODUCTS,
    payload: products,
  });
  const initialState = reducer(catalogueState, {
    type: LS_TO_CART,
    payload: localCart,
  });
  const state = reducer(initialState, {
    type: GET_FROM_CART_BACK2,
    payload: { cart_items: [{ productId: 1, quantity: 4 }] },
  });

  expect(mergedCart).toEqual([
    { id: 1, name: 'CPU', quantity: 4 },
    { id: 2, name: 'RAM', quantity: 2 },
  ]);
  expect(state.cart).toEqual(mergedCart);
  expect(state.quantity).toBe(6);
});

test('adds more units of a product that is already in the cart', () => {
  let state = reducer(undefined, {
    type: GET_ALL_PRODUCTS,
    payload: [{ id: 1, name: 'CPU' }],
  });

  for (let unit = 0; unit < 5; unit++) {
    state = reducer(state, { type: ADD_TO_CART, payload: 1 });
  }
  for (let extraUnit = 0; extraUnit < 3; extraUnit++) {
    state = reducer(state, { type: ADD_TO_CART, payload: 1 });
  }

  expect(state.cart).toHaveLength(1);
  expect(state.cart[0].quantity).toBe(8);
});

test('clears identity-bound state when the user logs out', () => {
  const state = reducer(
    {
      ...reducer(undefined, { type: '@@INIT' }),
      userInfo: { id: 1, email: 'first@example.com' },
      admin: true,
      cart: [{ id: 7, name: 'GPU', quantity: 1 }],
      backendCart: [{ id: 3, userId: 1 }],
      favorites: [{ id: 9 }],
      quantity: 1,
    },
    { type: LOGOUT }
  );

  expect(state.userInfo).toEqual([]);
  expect(state.admin).toBe(false);
  expect(state.cart).toEqual([]);
  expect(state.backendCart).toEqual([]);
  expect(state.favorites).toEqual([]);
  expect(state.quantity).toBe(0);
});

test('shows an empty deleted-products state after restoring the last product', () => {
  const deletedState = reducer(undefined, {
    type: PRODUCTS_DELETED,
    payload: [{ id: 42, name: 'Temporary product' }],
  });
  const restoredState = reducer(deletedState, {
    type: CLEAR_DELETED_PRODUCTS,
    payload: 42,
  });

  expect(restoredState.productsDeleted).toEqual([]);
  expect(restoredState.msgProductDeleted).toBe('');
});
