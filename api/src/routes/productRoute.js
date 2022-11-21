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
    const { id } = req.params;
    const product = await getProducts(req.query);
    const idReal = product.filter((e) => e.id == id);
    res.send(idReal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProducts(req.query);
    const idReal = product.filter((e) => e.id == id);
    console.log(idReal[0].id)
    const product2 = await putProducts(idReal[0].id, req.body);
    console.log(product2);
    res.send(product2);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = productRoute;
