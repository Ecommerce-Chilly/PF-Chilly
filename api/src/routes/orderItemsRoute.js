const { Router } = require("express");
const {
  deleteOrderItems,
} = require("../controllers/orderItems/deleteOrderItems");
const {
  getOrderItems,
  getAllOrders,
} = require("../controllers/orderItems/getOrderItems");
const { checkJwt, checkScopes } = require("../middleware/oAuth");
const postOrderItems = require("../controllers/orderItems/postOrderItems");
const orderItemsRoute = Router();

orderItemsRoute.delete("/:id", checkJwt, async (req, res) => {
  try {
    const orderItemsDelete = await deleteOrderItems(req.params.id);
    res.status(201).send(orderItemsDelete);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

orderItemsRoute.post("/", checkJwt, async (req, res) => {
  try {
    const newOrderItems = await postOrderItems(req.body);
    res.status(201).send(newOrderItems);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

orderItemsRoute.get("/", checkJwt, checkScopes, async (req, res) => {
  try {
    const orderItems = await getAllOrders(req.params.id);
    res.status(200).send(orderItems);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

orderItemsRoute.get("/:id", checkJwt, async (req, res) => {
  try {
    const orderItems = await getOrderItems(req.params.id);
    res.status(200).send(orderItems);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = orderItemsRoute;
