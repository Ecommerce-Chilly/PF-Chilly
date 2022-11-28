const { Cart_item } = require("../db");
const axios = require("axios");

const getCartItem = async ({ id }) => {
   if (!id) throw "Must send an id";
};
