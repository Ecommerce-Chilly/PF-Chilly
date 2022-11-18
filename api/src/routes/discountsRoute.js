const { Router } = require("express");
const { postDiscounts } = require("../controllers/postDiscounts");
const discountsRoute = Router();

discountsRoute.post("/", async (req, res) => {
  try {
    // console.log('hola')
    const discountDb = await postDiscounts(req.body);
    res.status(200).send(discountDb);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = discountsRoute;
