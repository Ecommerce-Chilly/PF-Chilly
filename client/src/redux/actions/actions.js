import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_DISCOUNT = 'CREATE_DISCOUNT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const FAIL_CREATED_MSG = 'FAIL_CREATED_MSG';

export const getProduct = () => {
  return async function (dispatch) {
    let product = await axios.get('http://localhost:3002/product');
    return dispatch({ type: GET_ALL_PRODUCTS, payload: product.data });
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    let productById = await axios.get(`http://localhost:3001/product/${id}`);
    return dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
  };
};

export const createProduct = (product) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post(
        'http://localhost:3001/product',
        product
      );
      return dispatch({ type: CREATE_PRODUCT, payload: createProdu });
    } catch (error) {
      return dispatch({ type: FAIL_CREATED_MSG, payload: error.response.data });
    }
  };
};
export const createDiscount = (product) => {
  return async function (dispatch) {
    try {
      const createDiscount = await axios.post(
        'http://localhost:3001/discount',
        product
      );
      return dispatch({ type: CREATE_DISCOUNT, payload: createDiscount.data });
    } catch (error) {
      return dispatch({
        type: FAIL_CREATED_MSG,
        payload: error.response.error.data,
      });
    }
  };
};

export const putProductById = (id, product) => {
  return async function (dispatch) {
    const putProduct = await axios.put(
      `http://localhost:3001/product/${id}`,
      product
    );
    return dispatch({ type: PUT_PRODUCT, payload: putProduct.data });
  };
};
