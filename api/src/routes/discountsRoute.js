const { Router } = require("express");
const { postDiscounts } = require('../controllers/discounts/postDiscounts')
const { putDiscounts } = require("../controllers/discounts/putDiscounts");
const { checkJwt, checkScopes } = require('../middleware/oAuth')
const discountsRoute = Router();

discountsRoute.post("/", checkJwt, checkScopes, async (req, res) => {
  try {
    const discountDb = await postDiscounts(req.body);
    res.status(200).send(discountDb);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
discountsRoute.put("/", checkJwt, checkScopes, async (req, res) => {
  try {
    const discount = await putDiscounts(req.body);
    return res.send(discount);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = discountsRoute;