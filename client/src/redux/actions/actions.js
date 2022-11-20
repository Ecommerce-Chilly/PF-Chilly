import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CHANGE_MSG = "CHANGE_MSG";
export const CREATE_DISCOUNT = "CREATE_DISCOUNT";


export const getProduct = () => {
  return async function (dispatch) {
    let produ = await axios.get("https://localhost:3001/product");
    return dispatch({ type: GET_ALL_PRODUCTS, payload: produ.data });
  };
};

export const createProduct = (product) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post(
        "http://localhost:3001/product",
        product
      );
      return dispatch({ type: CREATE_PRODUCT, payload: createProdu });
    } catch (error) {
      console.log(error);
      return dispatch({ type: CHANGE_MSG, payload: error });
    }
  };
};
export const createDiscount = (product) => {
  return async function (dispatch) {
    try {
      const createDiscount = await axios.post(
        "http://localhost:3001/discount",
        product
      );
      return dispatch({ type: CREATE_DISCOUNT, payload: createDiscount });
    } catch (error) {
      return dispatch({ type: CHANGE_MSG, payload: error });
    }
  };
};

