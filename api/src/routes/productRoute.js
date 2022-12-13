const { Router } = require('express');
const { postProduct } = require('../controllers/product/postProduct');
const {
  getProducts,
  getProductsDeleted,
} = require('../controllers/product/getProducts');
const { putProducts } = require('../controllers/product/putProducts');
const { deleteProduct } = require('../controllers/product/deleteProduct');
const { restoreProduct } = require('../controllers/product/restoreProduct');
const productRoute = Router();
const { checkJwt, checkScopes } = require('../middleware/oAuth');

productRoute.post('/', checkJwt, checkScopes, async (req, res) => {
  try {
    const productCreate = await postProduct(req.body);
    res.status(201).send(productCreate);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

productRoute.delete('/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id))
      return res
        .status(406)
        .send({ error: 'Not Acceptable, id is not a number' });
    const message = await deleteProduct(id);
    res.send({ message });
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

productRoute.get('/', async (req, res) => {
  try {
    const { category, name } = req.query;
    const product = await getProducts(category, null, name);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

productRoute.get('/deleted', checkJwt, checkScopes, async (req, res) => {
  try {
    const products = await getProductsDeleted();
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
});

productRoute.get('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) return res.status(404).send({ error: 'Send a number id' });
    const product = await getProducts(null, id);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

productRoute.put('/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);

    const product = await putProducts(id, req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

productRoute.put('/restore/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const product = await restoreProduct(id);
    res.send({ message: product });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = productRoute;