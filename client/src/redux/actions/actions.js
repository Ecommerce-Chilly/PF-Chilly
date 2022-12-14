import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const GET_PRODUCT_BY_NAME = 'GET_PRODUCT_BY_NAME';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const RESTORE_PRODUCT = 'RESTORE_PRODUCT';
export const PRODUCTS_DELETED = 'PRODUCTS_DELETED';
export const BRANDS = 'BRANDS';
export const CATEGORIES = 'CATEGORIES';
export const CREATE_DISCOUNT = 'CREATE_DISCOUNT';
export const PUT_DISCOUNT = 'PUT_DISCOUNT';
export const PUT_INVENTORY = 'PUT_INVENTORY';
export const GET_CATEGORY_DETAILS = 'GET_CATEGORY_DETAILS';
export const FILTER1 = 'FILTER1';
export const FILTER_BY_DETAILS = 'FILTER_BY_DETAILS';
export const ORDER_BY_PRICE = 'ORDER_BY_PRICE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT';
export const CLEAR_CART = 'CLEAR_CART';
export const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY';
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY';
export const CREATE_USER = 'CREATE_USER';
export const USER_SPECIFIC = 'USER_SPECIFIC';
export const LOGOUT = 'LOGOUT';
export const ALL_USERS = 'ALL_USERS';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const GET_FAVORITES = 'GET_FAVORITES';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const FAVORITE_MSG = 'FAVORITE_MSG';
export const CLEAR_PROD_MSG = 'CLEAR_PROD_MSG';
export const CLEAR_FAV_MSG = 'CLEAR_FAV_MSG';
export const CLEAR_FAV_STATE = 'CLEAR_FAV_STATE';
export const MSG_NOT_PRODUCT_DELETED = 'MSG_NOT_PRODUCT_DELETED';
export const CLEAR_DELETED_PRODUCTS = 'CLEAR_DELETED_PRODUCTS';
export const FAIL_CREATED_MSG = 'FAIL_CREATED_MSG';
export const ERROR_MSSG = 'ERROR_MSSG';
export const EUSEBIO = 'EUSEBIO';
export const ERROR_PUT_PRODUCT = 'ERROR_PUT_PRODUCT';
export const ERROR_CREATE_USER = 'ERROR_CREATE_USER';
export const PAY = 'PAY';
export const CLEAR_PAYLINK = 'CLEAR_PAYLINK';
export const USER_ADMIN = 'USER_ADMIN';
export const DELETE_USER = 'DELETE_USER';
export const ADD_ORDER = 'ADD_ORDER';
export const ALL_ORDERS = 'ALL_ORDERS';
export const ITEM_BUYED = 'ITEM_BUYED';
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';
export const ADD_TO_BUILD = 'ADD_TO_BUILD';
export const DELETE_FROM_BUILD = 'DELETE_FROM_BUILD';
export const BYO_TO_CART = 'BYO_TO_CART';
export const CLEAR_BYO = 'CLEAR_BYO';
export const CLEAR_MSG = 'CLEAR_MSG';
export const NO_FOOTER = 'NO_FOOTER';
export const HIDE_FOOTER = 'HIDE_FOOTER';
export const CLEAR_MSG_ORDER_ITEM = 'CLEAR_MSG_ORDER_ITEM';
// josema me paso de aca para abajo
export const LS_TO_CART = 'LS_TO_CART';
export const POST_DATA_USER = 'POST_DATA_USER';
export const ERROR_POST_DATA_USER = 'ERROR_POST_DATA_USER';
export const GET_DATA_USER = 'GET_DATA_USER';
export const ERROR_GET_DATA_USER = 'ERROR_GET_DATA_USER';
export const ADD_TO_CART_BACK = 'ADD_TO_CART_BACK';
export const DELETE_FROM_CART_BACK = 'DELETE_FROM_CART_BACK';
export const CHANGE_QUANTITY_CART_BACK = 'CHANGE_QUANTITY_CART_BACK';
export const CLEAR_CART_FROM_BACK = 'CLEAR_CART_FROM_BACK';
export const GET_FROM_CART_BACK = 'GET_FROM_CART_BACK';
export const GET_FROM_CART_BACK_BY_ID = 'GET_FROM_CART_BACK_BY_ID';
export const PUT_FROM_CART_BACK = 'PUT_FROM_CART_BACK';
export const GET_FROM_CART_BACK2 = 'GET_FROM_CART_BACK2';
export const JODER = 'JODER';
//! PRODUCTS ACTIONS --------------------------------------------------------------------
export const getProduct = () => {
  return async function (dispatch) {
    let product = await axios.get('/product');
    return dispatch({ type: GET_ALL_PRODUCTS, payload: product.data });
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let productById = await axios.get(`/product/${id}`);
      return dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
    } catch (error) {
      return dispatch({ type: EUSEBIO, payload: error.response.data.error });
    }
  };
};

export const createProduct = (product, token) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post('/product', product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: CREATE_PRODUCT, payload: createProdu.data });
    } catch (error) {
      return dispatch({ type: FAIL_CREATED_MSG, payload: error.response.data });
    }
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    if (name === '') {
      return dispatch({ type: ERROR_MSSG });
    }
    try {
      let productByName = await axios.get(`/product?name=${name}`);

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
      const putProduct = await axios.put(`/product/${id}`, product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
    const deleteProduct = await axios.delete(`/product/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: DELETE_PRODUCT, payload: deleteProduct.data });
  };
};

export const restoreProduct = (id, token) => {
  return async function (dispatch) {
    let restoreProduct = await axios.put(
      `/product/restore/${id}`,
      {},
      {
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
      const allProductDelete = await axios.get('/product/deleted', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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

export const allBrands = (payload) => {
  return {
    type: BRANDS,
    payload: payload,
  };
};

export const allCategories = (payload) => {
  return {
    type: CATEGORIES,
    payload: payload,
  };
};

//!DISCOUNTS ACTIONS --------------------------------------------------------------------
export const createDiscount = (product, token) => {
  return async function (dispatch) {
    try {
      const createDiscount = await axios.post('/discount', product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
    const putInventory = await axios.put('/discount/', product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: PUT_DISCOUNT, payload: putInventory.data });
  };
};

//!INVENTORY ACTIONS --------------------------------------------------------------------
export const putInventory = (id, product, token) => {
  return async function (dispatch) {
    const putInventory = await axios.put(`/inventory/${id}`, product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: PUT_INVENTORY, payload: putInventory.data });
  };
};

//! PRODUCT CATEGORY DETAILS && FILTERS ACTIONS -----------------------------------------
export const getCategoryDetails = (category) => {
  return async function (dispatch) {
    const categoryDetails = await axios.get(`/categoryDetails/${category}`);
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
    let allUsers = await axios.get('/user/all', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: ALL_USERS, payload: allUsers.data });
  };
};
export const deleteUser = (token, id) => {
  return async function (dispatch) {
    try {
      let msg = await axios.delete(`/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: DELETE_USER, payload: msg.data });
    } catch (error) {
      return dispatch({
        type: USER_NOT_FOUND,
        payload: error.response.data.error,
      });
    }
  };
};
export const createUser = (newUser, token) => {
  return async function (dispatch) {
    try {
      let createUser = await axios.post('/user', newUser, {
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
      let userSpeci = await axios.get(`/user?email=${userFound}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
    axios
      .get(`/user/admin?email=${user}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        return dispatch({
          type: USER_ADMIN,
          payload: data.data,
        }).catch((error) => {
          return dispatch({
            type: USER_NOT_FOUND,
            payload: error.response.data.error,
          });
        });
      });
  };
};
export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};

//! FAVOURITES ACTIONS --------------------------------------------------------------------
export const addFavorite = (ids, token) => {
  return async function (dispatch) {
    try {
      let favorite = await axios.post('/favorite', ids, {
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
      let favorites = await axios.get(`/favorite/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
        `/favorite/${ids.userId}/${ids.productId}`,
        {
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
      let payLink = await axios.post('/payment/', payData, {
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
export const clearOrderMsg = () => {
  return {
    type: CLEAR_MSG_ORDER_ITEM,
  };
};

//! ORDER ITEMS ----------------------------------------------------------------------------
export const deletOrderItem = (id, token) => {
  return async function (dispatch) {
    let deleteOrder = await axios.delete(`/orderItems/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: DELETE_ORDER_ITEM, payload: deleteOrder.data });
  };
};

export const addOrder = (userId, productId, quantity, token) => {
  return async function (dispatch) {
    let msg = await axios.post(
      '/orderItems',
      { userId, productId, quantity },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: ADD_ORDER, payload: msg.data });
  };
};

export const getAllOrders = (token) => {
  return async function (dispatch) {
    let ordersItems = await axios.get('/orderItems', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: ALL_ORDERS, payload: ordersItems.data });
  };
};

export const getOrderById = (id, token) => {
  return async function (dispatch) {
    let ordersItem = await axios.get(`/orderItems/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: ITEM_BUYED, payload: ordersItem.data });
  };
};

export const addToBuild = (payload) => {
  return {
    type: ADD_TO_BUILD,
    payload: payload,
  };
};

export const deleteFromBuild = () => {
  return {
    type: DELETE_FROM_BUILD,
  };
};

export const byoToCart = (byo) => {
  return {
    type: BYO_TO_CART,
    payload: byo,
  };
};

export const clearBYO = () => {
  return {
    type: CLEAR_BYO,
  };
};
export const noFooter = () => {
  return {
    type: NO_FOOTER,
  };
};
export const hideFooter = () => {
  return {
    type: HIDE_FOOTER,
  };
};
//josema me paso hasta aca
export const localStorageToCart = (payload) => {
  return {
    type: LS_TO_CART,
    payload: payload,
  };
};

export const postDataUser = (dataUser) => {
  return async function (dispatch) {
    try {
      let infoCheckout = await axios.post('/datauser', dataUser);
      return dispatch({ type: POST_DATA_USER, payload: infoCheckout.data });
    } catch (error) {
      return dispatch({
        type: ERROR_POST_DATA_USER,
        payload: error.response.data.error,
      });
    }
  };
};

export const getDataUser = (dUser) => {
  return async function (dispatch) {
    try {
      let dataUser = await axios.get('/datauser', dUser);
      return dispatch({ type: GET_DATA_USER, payload: dataUser.data });
    } catch (error) {
      return dispatch({
        type: ERROR_GET_DATA_USER,
        payload: error.response.data.error,
      });
    }
  };
};

export const addToCartBack = (cartId, productId, quantity) => {
  return async function (dispatch) {
    //HECHO LA RE CONCHA DE LA LORA VIEJO
    if (quantity === undefined) quantity = 1;
    try {
      let backCart = await axios.post('/cartItems', {
        quantity: quantity,
        cartId: cartId,
        productId: productId,
      });
      return dispatch({ type: ADD_TO_CART_BACK, payload: backCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFromCartBack = (cartId, productId) => {
  return async function (dispatch) {
    try {
      let backCart = await axios.delete(`/cartItems/${cartId}/${productId}`);
      return dispatch({ type: DELETE_FROM_CART_BACK, payload: backCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartFromBack = (cartId) => {
  return async function (dispatch) {
    try {
      let getCart = await axios.get(`/cart/${cartId}`);
      return dispatch({ type: GET_FROM_CART_BACK, payload: getCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartFromBack2 = (cartId) => {
  return async function (dispatch) {
    try {
      let getCart = await axios.get(`/cart/${cartId}`);
      return dispatch({ type: GET_FROM_CART_BACK2, payload: getCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const putCartFromBack = (cartId, productId, quantity) => {
  return async function (dispatch) {
    try {
      console.log(cartId, productId, quantity);
      let getCart = await axios.put('/cartItems', {
        cartId,
        productId,
        quantity,
      });
      console.log(getCart.data);
      return dispatch({ type: PUT_FROM_CART_BACK, payload: getCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCartFromBack = (cartId) => {
  return async function (dispatch) {
    try {
      let clearCart = await axios.post(`/user/cleanCart/${cartId}`);
      return dispatch({ type: CLEAR_CART_FROM_BACK, payload: clearCart.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const emailjs = (data) => {
  return async function (dispatch) {
    try {
      let emailToUser = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        data
      );
      return dispatch({ type: JODER, payload: emailToUser.data });
    } catch (error) {
      console.log(error);
    }
  };
};
