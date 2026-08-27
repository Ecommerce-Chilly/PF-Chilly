import reducer from './redux/reducer/reducer';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  ORDER_BY_PRICE,
} from './redux/actions/actions';

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
