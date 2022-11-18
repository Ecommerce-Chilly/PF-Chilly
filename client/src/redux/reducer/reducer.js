import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  CHANGE_MSG,
} from "../actions/actions.js";

const initialState = {
  product: [],
  createMsg: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        createMsg: "",
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        createMsg: action.payload,
      };
    case CHANGE_MSG:
      return {
        ...state,
        createMsg: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
