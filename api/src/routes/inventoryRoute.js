const { Router } = require("express");
<<<<<<< HEAD
const postInventory = require("../controllers/inventory/postInventory");
const { putInventory } = require("../controllers/inventory/putInventory");
=======
const postInventory = require("../controllers/postInventory");
const { putInventory } = require("../controllers/putInventory");
>>>>>>> 44fe9fa9264024360b95c6cda0f8753ee688b9e0
const inventoryRoutes = Router();

inventoryRoutes.post("/", async (req, res) => {
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
inventoryRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const inv = await putInventory(id, quantity);
    return res.send(inv);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = inventoryRoutes;
