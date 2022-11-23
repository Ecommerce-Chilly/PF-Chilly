const { Router } = require("express");
const productRoute = require("./productRoute");
// const categoryRoute = require("./categoryRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
<<<<<<< HEAD

=======
const detailsCategoryRoute = require("./detailsCategoryRoute");
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7
const { hardCodeoInfo } = require("../controllers/hardCode");

const { userRoute, } = require("./userRoute")

const router = Router();

router.use("/Guillo", async (req, res, next) => {
  await hardCodeoInfo();
  console.log("ya termine");
  next();
});
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);
<<<<<<< HEAD
router.use("/user", userRoute)
=======
router.use("/categoryDetails", detailsCategoryRoute);
>>>>>>> 6e7355d84470fde1f722ce15d628d2c7e6dc53f7

module.exports = router;
