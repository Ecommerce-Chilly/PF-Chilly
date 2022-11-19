const { Router } = require("express");
const { postProduct } = require("../controllers/postProduct");
const { getProducts } = require("../controllers/getProducts");
const productRoute = Router();

productRoute.post("/", async (req, res) => {
  try {
    const productCreate = await postProduct(req.body);
    res.status(201).send(productCreate);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.get("/", async (req, res) => {
  try {
    const product = await getProducts(req.query);
    res.send(product);
  } catch (error) {}
});
productRoute.get;

module.exports = productRoute;
