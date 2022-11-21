import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  CREATE_DISCOUNT,
  PUT_PRODUCT,
  CHANGE_MSG,
} from "../actions/actions.js";

const initialState = {
  product: [],
  productDetail: [],
  productChangedMsg: "",
  createMsg: "",
  failToCreated: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        failToCreated: "",
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        createMsg: action.payload,
      };

    case CREATE_DISCOUNT:
      return {
        ...state,
        createMsg: action.payload,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case CHANGE_MSG:
      return {
        ...state,
        failToCreated: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
