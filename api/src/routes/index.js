const { Router } = require("express");
const productRoute = require("./productRoute");
// const categoryRoute = require("./categoryRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
const { userRoute, } = require("./userRoute")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);
router.use("/user", userRoute)

module.exports = router;
