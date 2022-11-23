const { Router } = require("express");
const postInventory = require("../controllers/postInventory");
const { putInventory } = require("../controllers/putInventory");
const invetoryRoutes = Router();

invetoryRoutes.post("/", async (req, res) => {
   try {
      const { quantity } = req.body;
      if (!quantity)
         return res.status(404).send("Send a quantity of products ");
      const invCreate = await postInventory(quantity);
      if (!invCreate) return res.status(500).send("Server error");
      return res.send(invCreate);
   } catch (error) {
      res.status(404).send(error);
   }
});
invetoryRoutes.put("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { quantity } = req.body;
      const inv = await putInventory(id, quantity);
      return res.send(inv);
   } catch (error) {
      res.status(404).send(error);
   }
});
module.exports = invetoryRoutes;
