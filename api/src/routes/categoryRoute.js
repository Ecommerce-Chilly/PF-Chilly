const { Router } = require("express");
const { getCategory } = require("../controllers/category/getCategory");
const categoryRoute = Router();

categoryRoute.get("/", async (req, res) => {
  try {
    const categoryDb = await getCategory();
    res.status(200).send(categoryDb);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = categoryRoute;
