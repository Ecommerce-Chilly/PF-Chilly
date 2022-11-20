const { Router } = require("express");
const { postProduct } = require("../controllers/postProduct");
const { getProducts } = require("../controllers/getProducts");
const { putProducts } = require("../controllers/putProducts");
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
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.get("/:id", async (req, res) => {
  try {
    const product = await getProducts(req.params.id);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.put("/:id", async (req, res) => {
  try {
    const product = await putProducts(req.params);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = productRoute;
