const { Router } = require("express");
const { postDiscounts } = require("../controllers/postDiscounts");
const { putDiscounts } = require("../controllers/putDiscounts");
const discountsRoute = Router();

discountsRoute.post("/", async (req, res) => {
  try {
    const discountDb = await postDiscounts(req.body);
    res.status(200).send(discountDb);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
discountsRoute.put("/", async (req, res) => {
  try {
    const discount = await putDiscounts(req.body);
    return res.send(discount);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
module.exports = discountsRoute;
