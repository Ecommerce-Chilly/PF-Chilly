const { Router } = require('express');
const { postCartItems } = require('../controllers/cart_items/postCartItems');
const { modifyQuantity } = require('../controllers/cart_items/modifyCartItems');
const { deleteItem } = require('../controllers/cart_items/deleteCartItem');

const cartItemsRoute = Router();

cartItemsRoute.post('/', async (req, res) => {
  try {
    const cart_items = await postCartItems(req.body);
    res.status(201).send(cart_items);
  } catch (error) {
    res.status(404).send(error);
  }
});

cartItemsRoute.put('/', async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const modifying = await modifyQuantity(cartId, productId, quantity);
    res.status(200).send(modifying);
  } catch (error) {
    res.status(404).send(error);
  }
});

cartItemsRoute.delete('/:cartId/:productId', async (req, res) => {
  console.log(req.params);
  try {
    const deleteCartItem = await deleteItem(req);
    res.status(202).send(deleteCartItem);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = cartItemsRoute;
