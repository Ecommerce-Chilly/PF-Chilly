const { Router } = require("express");
const postInventory = require("../controllers/postInventory");
const invetoryRoutes = Router();

invetoryRoutes.post("/", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) return res.status(404).send("Send a quantity of products ");
    const invCreate = await postInventory(quantity);
    if (!invCreate) return res.status(500).send("Server error");
    return res.send(invCreate);
  } catch (error) {
    res.status(404).send(error);
  }
});
invetoryRoutes.put("/", async (req, res) => {
  try {
  } catch (error) {}
});
module.exports = invetoryRoutes;
