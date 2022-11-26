const { Router } = require("express");
const { getDetailsCategory } = require("../controllers/category/getDetailsCategory");
const detailsCategoryRoute = Router();

detailsCategoryRoute.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) res.status(404).send("Send a category");
    const details = await getDetailsCategory(category);
    res.send(details);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = detailsCategoryRoute;
