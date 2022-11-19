const { Router } = require("express");
const productRoute = require("./productRoute");
// const categoryRoute = require("./categoryRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
const { hardCodeoInfo } = require("../controllers/hardCode");
const router = Router();

router.use("/Guillo", (req, res, next) => {
  hardCodeoInfo();
  next();
});
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);

module.exports = router;
