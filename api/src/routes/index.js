const { Router } = require("express");
const productRoute = require("./productRoute");
// const categoryRoute = require("./categoryRoute");
const inventoryRoute = require("./inventoryRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/inventory", inventoryRoute);

module.exports = router;
