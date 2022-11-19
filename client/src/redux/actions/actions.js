import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CHANGE_MSG = 'CHANGE_MSG';

export const getProduct = () => {
  return async function (dispatch) {
    let product = await axios.get('https://localhost:3000/product');
    return { type: GET_ALL_PRODUCTS, payload: product.data };
  };
};

export const createProduct = (product) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post(
        'https://localhost:3000/product',
        product
      );
      return dispatch({ type: CREATE_PRODUCT, payload: createProdu.data });
    } catch (error) {
      return dispatch({ type: CHANGE_MSG, payload: error.response.data });
    }
  };
};
