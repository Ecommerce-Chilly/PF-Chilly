import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/reducer';
import thunk from 'redux-thunk';
import { loadCart, saveCart } from './cartPersistence';
import { localStorageToCart } from '../actions/actions';

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const storedCart = loadCart();
if (storedCart.length > 0) {
  store.dispatch(localStorageToCart(storedCart));
}

let cartSnapshot = JSON.stringify(store.getState().cart);
store.subscribe(() => {
  const nextCart = store.getState().cart;
  const nextSnapshot = JSON.stringify(nextCart);

  if (nextSnapshot !== cartSnapshot) {
    cartSnapshot = nextSnapshot;
    saveCart(nextCart);
  }
});

export default store;
