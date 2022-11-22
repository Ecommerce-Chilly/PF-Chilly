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
} from "../actions/actions.js";

const initialState = {
  product: [],
  allProduct: [],
  productDetail: [],
  createProductMsg: "",
  productChangedMsg: "",
  productDeletedMsg: "",
  categoryDetails: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        createProductMsg: "",
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
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
        productChangedMsg: action.payload,
      };
    case PUT_DISCOUNT:
      return {
        ...state,
        productChangedMsg: action.payload,
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
    case FILTER1:
      let temporal = state.allProduct;
      let filtered = temporal.filter((e) => e.categoryName === action.payload);

      if (action.payload === "") {
        filtered = state.allProduct;
      }
    default:
      return state;
  }
};

export default rootReducer;
