const { Router } = require("express");
const { postProduct } = require("../controllers/postProduct");
const { getProducts } = require("../controllers/getProducts");
<<<<<<< HEAD
=======
const { putProducts } = require("../controllers/putProducts");
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
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
<<<<<<< HEAD
    const product = await getProducts(req.query);
    res.send(product);
  } catch (error) {}
});
productRoute.get;

=======
    const { category } = req.query;
    const product = await getProducts(category);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let newId = Number(id)
    const product = await getProducts(null, newId);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let newId = Number(id)
    const product = await putProducts(newId, req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31
module.exports = productRoute;
