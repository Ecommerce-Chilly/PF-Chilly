const { Router } = require("express");
const { postProduct } = require("../controllers/postProduct");
const productRoute = Router();

productRoute.post("/", async (req, res) => {
  try {
    const productCreate = await postProduct(req.body);
    res.status(201).send(productCreate);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

productRoute.get;

module.exports = productRoute;
