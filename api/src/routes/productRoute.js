const { Router } = require("express");
<<<<<<< HEAD
const { postProduct } = require("../controllers/product/postProduct");
const { getProducts, getProductsDeleted } = require("../controllers/product/getProducts");
const { putProducts } = require("../controllers/product/putProducts");
const { deleteProduct } = require("../controllers/product/deleteProduct");
const { restoreProduct } = require("../controllers/product/restoreProduct")
=======
const { postProduct } = require("../controllers/postProduct");
const { getProducts, getProductsDeleted } = require("../controllers/getProducts");
const { putProducts } = require("../controllers/putProducts");
const { deleteProduct } = require("../controllers/deleteProduct");
const { restoreProduct } = require("../controllers/restoreProduct")
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
const productRoute = Router();

productRoute.post("/", async (req, res) => {
  try {
    const productCreate = await postProduct(req.body);
    res.status(201).send(productCreate);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
productRoute.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const message = await deleteProduct(id);
    res.send({ message });
  } catch (error) {
    res.status(404).send({ error: error });
  }
});
productRoute.get("/", async (req, res) => {
  try {
    const { category, name } = req.query;
    const product = await getProducts(category, null, name);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
productRoute.get('/deleted', async (req, res) => {
  try {
    const products = await getProductsDeleted()
    res.send(products)
  } catch (error) {
    res.status(404).send(error)
  }
})
productRoute.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) return res.status(404).send({ error: "Send a number id" })
    const product = await getProducts(null, id);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
productRoute.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);

    const product = await putProducts(id, req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
productRoute.put('/restore/:id', async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const product = await restoreProduct(id)
    res.send({ message: product })
  } catch (error) {
    res.status(400).send({ error: error });
  }
})
module.exports = productRoute;
