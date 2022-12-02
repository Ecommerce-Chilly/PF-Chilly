import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const RESTORE_PRODUCT = "RESTORE_PRODUCT";
export const PRODUCTS_DELETED = "PRODUCTS_DELETED";
export const CREATE_DISCOUNT = "CREATE_DISCOUNT";
export const PUT_DISCOUNT = "PUT_DISCOUNT";
export const PUT_INVENTORY = "PUT_INVENTORY";
export const GET_CATEGORY_DETAILS = "GET_CATEGORY_DETAILS";
export const FILTER1 = "FILTER1";
export const FILTER_BY_DETAILS = "FILTER_BY_DETAILS";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";
export const CLEAR_CART = "CLEAR_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const CREATE_USER = "CREATE_USER";
export const USER_SPECIFIC = "USER_SPECIFIC";
export const LOGOUT = "LOGOUT";
export const ALL_USERS = "ALL_USERS";
export const USER_NOT_FOUND = "USER_NOT_FOUND";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const GET_FAVORITES = "GET_FAVORITES";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FAVORITE_MSG = "FAVORITE_MSG";
export const CLEAR_PROD_MSG = "CLEAR_PROD_MSG";
export const CLEAR_FAV_MSG = "CLEAR_FAV_MSG";
export const CLEAR_FAV_STATE = "CLEAR_FAV_STATE";
export const MSG_NOT_PRODUCT_DELETED = "MSG_NOT_PRODUCT_DELETED";
export const CLEAR_DELETED_PRODUCTS = "CLEAR_DELETED_PRODUCTS";
export const FAIL_CREATED_MSG = "FAIL_CREATED_MSG";
export const ERROR_MSSG = "ERROR_MSSG";
export const EUSEBIO = "EUSEBIO";
export const ERROR_PUT_PRODUCT = "ERROR_PUT_PRODUCT";
export const ERROR_CREATE_USER = "ERROR_CREATE_USER";
export const PAY = "PAY";
export const CLEAR_PAYLINK = "CLEAR_PAYLINK";
export const USER_ADMIN = "USER_ADMIN";

//! PRODUCTS ACTIONS --------------------------------------------------------------------
export const getProduct = () => {
  return async function (dispatch) {
    let product = await axios.get("http://localhost:3001/product");
    return dispatch({ type: GET_ALL_PRODUCTS, payload: product.data });
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let productById = await axios.get(`http://localhost:3001/product/${id}`);
      return dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
    } catch (error) {
      return dispatch({ type: EUSEBIO, payload: error.response.data.error });
    }
  };
};

export const createProduct = (product, token) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post(
        "http://localhost:3001/product",
        product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({ type: CREATE_PRODUCT, payload: createProdu });
    } catch (error) {
      return dispatch({ type: FAIL_CREATED_MSG, payload: error.response.data });
    }
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    if (name === "") {
      return dispatch({ type: ERROR_MSSG });
    }
    try {
      let productByName = await axios.get(
        `http://localhost:3001/product?name=${name}`
      );

      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: productByName.data,
      });
    } catch (error) {
      return dispatch({ type: ERROR_MSSG, payload: error.response.data });
    }
  };
};

export const putProductById = (id, product, token) => {
  return async function (dispatch) {
    try {
      const putProduct = await axios.put(
        `http://localhost:3001/product/${id}`,
        product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({ type: PUT_PRODUCT, payload: putProduct.data });
    } catch (error) {
      return dispatch({
        type: ERROR_PUT_PRODUCT,
        payload: error.response.data,
      });
    }
  };
};

export const deleteProdut = (id, token) => {
  return async function (dispatch) {
    const deleteProduct = await axios.delete(
      `http://localhost:3001/product/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
    return dispatch({ type: DELETE_PRODUCT, payload: deleteProduct.data });
  };
};

export const restoreProduct = (id, token) => {
  return async function (dispatch) {
    let restoreProduct = await axios.put(
      `http://localhost:3001/product/restore/${id}`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
    return dispatch({ type: RESTORE_PRODUCT, payload: restoreProduct.data });
  };
};

export const getProductDeleted = (token) => {
  return async function (dispatch) {
    try {
      const allProductDelete = await axios.get(
        "http://localhost:3001/product/deleted", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({
        type: PRODUCTS_DELETED,
        payload: allProductDelete.data,
      });
    } catch (error) {
      return dispatch({
        type: MSG_NOT_PRODUCT_DELETED,
        payload: error.response.data,
      });
    }
  };
};

//!DISCOUNTS ACTIONS --------------------------------------------------------------------
export const createDiscount = (product, token) => {
  return async function (dispatch) {
    try {
      const createDiscount = await axios.post(
        "http://localhost:3001/discount",
        product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
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

export const putDiscount = (product, token) => {
  return async function (dispatch) {
    const putInventory = await axios.put(
      "http://localhost:3001/discount/",
      product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
    return dispatch({ type: PUT_DISCOUNT, payload: putInventory.data });
  };
};

//!INVENTORY ACTIONS --------------------------------------------------------------------
export const putInventory = (id, product, token) => {
  return async function (dispatch) {
    const putInventory = await axios.put(
      `http://localhost:3001/inventory/${id}`,
      product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    );
    return dispatch({ type: PUT_INVENTORY, payload: putInventory.data });
  };
};

//! PRODUCT CATEGORY DETAILS && FILTERS ACTIONS -----------------------------------------
export const getCategoryDetails = (category) => {
  return async function (dispatch) {
    const categoryDetails = await axios.get(
      `http://localhost:3001/categoryDetails/${category}`
    );
    return dispatch({
      type: GET_CATEGORY_DETAILS,
      payload: categoryDetails.data,
    });
  };
};

export const filter1 = (payload) => {
  return {
    type: FILTER1,
    payload: payload,
  };
};

export const filterbyDetails = (category, details) => {
  return {
    type: FILTER_BY_DETAILS,
    payload: [category, details],
  };
};

//! CART ACTIONS --------------------------------------------------------------------
export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const deleteP = (id) => {
  return {
    type: DELETE_CART_PRODUCT,
    payload: id,
  };
};

export const updateCartQuantity = () => {
  return {
    type: UPDATE_CART_QUANTITY,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const increaseProductQuantity = (id) => {
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    payload: id,
  };
};

export const decreaseProductQuantity = (id) => {
  return {
    type: DECREASE_PRODUCT_QUANTITY,
    payload: id,
  };
};

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload: payload,
  };
}

//! USERS ACTIONS --------------------------------------------------------------------
export const getAllUsers = (token) => {
  return async function (dispatch) {
    let allUsers = await axios.get("http://localhost:3001/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: ALL_USERS, payload: allUsers.data });
  };
};

export const createUser = (newUser, token) => {
  return async function (dispatch) {
    try {
      let createUser = await axios.post("http://localhost:3001/user", newUser, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: CREATE_USER, payload: createUser.data });
    } catch (error) {
      return dispatch({
        type: ERROR_CREATE_USER,
        payload: error.response.data.error,
      });
    }
  };
};

export const userSpecific = (userFound, token) => {
  return async function (dispatch) {
    try {
      let userSpeci = await axios.get(
        `http://localhost:3001/user?email=${userFound}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({ type: USER_SPECIFIC, payload: userSpeci.data });
    } catch (error) {
      return dispatch({
        type: USER_NOT_FOUND,
        payload: error.response.data.error,
      });
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
export const userAdmin = (user, token) => {
  return async function (dispatch) {
    axios.get(`http://localhost:3001/user/admin?email=${user}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(data => {
      return dispatch({
        type: USER_ADMIN,
        payload: data.data
      }).catch(error => {
        return dispatch({
          type: USER_NOT_FOUND,
          payload: error.response.data.error,
        })
      })
    })
  }
}
//! FAVOURITES ACTIONS --------------------------------------------------------------------
export const addFavorite = (ids, token) => {
  return async function (dispatch) {
    try {
      let favorite = await axios.post("http://localhost:3001/favorite", ids, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: ADD_FAVORITE, payload: favorite.data });
    } catch (error) {
      return dispatch({
        type: FAVORITE_MSG,
        payload: error.response.data.error,
      });
    }
  };
};

export const getFavorites = (userId, token) => {
  return async function (dispatch) {
    try {
      let favorites = await axios.get(
        `http://localhost:3001/favorite/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({ type: GET_FAVORITES, payload: favorites.data });
    } catch (error) {
      return dispatch({
        type: FAVORITE_MSG,
        payload: error.response.data.error,
      });
    }
  };
};

export const deleteFavorite = (ids, token) => {
  return async function (dispatch) {
    try {
      let favorite2 = await axios.delete(
        `http://localhost:3001/favorite/${ids.userId}/${ids.productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      return dispatch({ type: DELETE_FAVORITE, payload: favorite2.data });
    } catch (error) {
      return dispatch({
        type: FAVORITE_MSG,
        payload: error.response.data.error,
      });
    }
  };
};

//! CLEAR MSG ACTIONS --------------------------------------------------------------------
export const clearProdMsg = () => {
  return {
    type: CLEAR_PROD_MSG,
  };
};

export const clearFavMsg = () => {
  return {
    type: CLEAR_FAV_MSG,
  };
};
export const clearFavSate = () => {
  return {
    type: CLEAR_FAV_STATE,
  };
};
export const clearDeleted = (payload) => {
  return {
    type: CLEAR_DELETED_PRODUCTS,
    payload: payload,
  };
};

export const pay = (payData, token) => {
  return async function (dispatch) {
    try {

      let payLink = await axios.post("http://localhost:3001/payment/", payData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: PAY, payload: payLink.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearPaylink = () => {
  return {
    type: CLEAR_PAYLINK,
  };
};
