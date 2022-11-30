import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  CREATE_DISCOUNT,
  PUT_PRODUCT,
  PUT_INVENTORY,
  FAIL_CREATED_MSG,
  PUT_DISCOUNT,
  DELETE_PRODUCT,
  GET_CATEGORY_DETAILS,
  FILTER1,
  FILTER_BY_DETAILS,
  GET_PRODUCT_BY_NAME,
  ERROR_MSSG,
  EUSEBIO,
  RESTORE_PRODUCT,
  ERROR_PUT_PRODUCT,
  ADD_TO_CART,
  DELETE_CART_PRODUCT,
  CLEAR_CART,
  CREATE_USER,
  USER_SPECIFIC,
  LOGOUT,
  ERROR_CREATE_USER,
  ALL_USERS,
  USER_NOT_FOUND,
  UPDATE_CART_QUANTITY,
  GET_FAVORITES,
  ADD_FAVORITE,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  DELETE_FAVORITE,
  CLEAR_PROD_MSG,
} from '../actions/actions.js';

const initialState = {
  product: [],
  allProduct: [],
  productDetail: [],
  createProductMsg: '',
  productChangedMsg: '',
  searchProductMsg: '',
  categoryDetails: [],
  cart: [],
  users: [],
  userInfo: [],
  userNotFound: '',
  createUserMsg: '',
  quantity: 0,
  favorites: [],
  favoriteMsg: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        createProductMsg: '',
        searchProductMsg: '',
        productChangedMsg: '',
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: [action.payload],
      };
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        product: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        createProductMsg: action.payload,
      };

    case CREATE_DISCOUNT:
      return {
        ...state,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case PUT_INVENTORY:
      return {
        ...state,
      };
    case PUT_DISCOUNT:
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productDeletedMsg: action.payload,
      };
    case FAIL_CREATED_MSG:
      return {
        ...state,
        createProductMsg: action.payload,
      };
    case GET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: action.payload,
      };
    case RESTORE_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };

    case FILTER1:
      let temporal = state.allProduct;
      let filtered = temporal.filter((e) => e.categoryName === action.payload);

      if (action.payload === '') {
        filtered = state.allProduct;
      }
      return {
        ...state,
        searchProductMsg: '',
        product: filtered,
      };
    case FILTER_BY_DETAILS:
      let temporal2 = state.allProduct;

      let filtered2 = temporal2.filter(
        (e) => e.categoryName === action.payload[0]
      );

      if (action.payload[0] === '') {
        filtered2 = state.allProduct;
      }

      for (const property in action.payload[1]) {
        filtered2 = filtered2.filter(
          (e) => e.details[0][property] === action.payload[1][property]
        );
      }
      return {
        ...state,
        searchProductMsg: '',
        product: filtered2,
      };
    case ERROR_MSSG:
      return {
        ...state,
        searchProductMsg: action.payload,
      };
    case ERROR_PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case EUSEBIO:
      return {
        ...state,
        searchProductMsg: action.payload,
      };

    case ADD_TO_CART:
      let prod = state.allProduct.find((e) => e.id === action.payload);
      let foundProd = state.cart.find((e) => e.id === action.payload);
      if (foundProd) {
        foundProd.quantity++;
      } else {
        prod.quantity = 1;
      }
      return {
        ...state,
        cart: prod.quantity === 1 ? state.cart.concat(prod) : state.cart,
      };
    case DELETE_CART_PRODUCT:
      let cart1 = state.cart.filter((e) => e.id !== action.payload);
      return {
        ...state,
        cart: cart1,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        quantity: 0,
      };
    case UPDATE_CART_QUANTITY:
      let cartQuantity = 0;
      for (let i = 0; i < state.cart.length; i++) {
        cartQuantity = cartQuantity + state.cart[i].quantity;
      }
      return {
        ...state,
        quantity: cartQuantity,
      };
    case ALL_USERS:
      return {
        ...state,
        users: action.payload,
        createUserMsg: '',
      };

    case CREATE_USER:
      return {
        ...state,
        createUserMsg: action.payload,
        userNotFound: '',
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        createUserMsg: action.payload,
      };
    case USER_SPECIFIC:
      return {
        ...state,
        userInfo: action.payload,
        createUserMsg: '',
      };
    case USER_NOT_FOUND:
      return {
        ...state,
        userNotFound: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: [],
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.products,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    case INCREASE_PRODUCT_QUANTITY:
      let product = state.cart.find((e) => e.id === action.payload);

      product.quantity = product.quantity + 1;

      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case DECREASE_PRODUCT_QUANTITY:
      let product2 = state.cart.find((e) => e.id === action.payload);

      if (product2.quantity > 1) {
        product2.quantity = product2.quantity - 1;
      }

      return {
        ...state,
        quantity:
          state.quantity > 1 ? state.quantity - 1 : (state.quantity = 1),
      };
    case CLEAR_PROD_MSG:
      return {
        ...state,
        createProductMsg: '',
        productChangedMsg: '',
      };
    default:
      return state;
  }
};

export default rootReducer;
