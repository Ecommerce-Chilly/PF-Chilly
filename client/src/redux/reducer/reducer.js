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
} from "../actions/actions.js";

const initialState = {
  product: [],
  allProduct: [],
  productDetail: [],
  createProductMsg: "",
  productChangedMsg: "",
  searchProductMsg: "",
  categoryDetails: [],
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        createProductMsg: "",
        searchProductMsg: "",
        productChangedMsg: "",
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

      if (action.payload === "") {
        filtered = state.allProduct;
      }
      return {
        ...state,
        searchProductMsg: "",
        product: filtered,
      };
    case FILTER_BY_DETAILS:
      let temporal2 = state.allProduct;

      let filtered2 = temporal2.filter(
        (e) => e.categoryName === action.payload[0]
      );

      if (action.payload[0] === "") {
        filtered2 = state.allProduct;
      }

      for (const property in action.payload[1]) {
        filtered2 = filtered2.filter(
          (e) => e.details[0][property] === action.payload[1][property]
        );
      }

      return {
        ...state,
        searchProductMsg: "",
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
      console.log(action.payload);
      let prod = state.allProduct.find((e) => e.id === action.payload);
      console.log(prod);
      return {
        ...state,
        cart: state.cart.concat(prod),
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
      };
    default:
      return state;
  }
};

export default rootReducer;
