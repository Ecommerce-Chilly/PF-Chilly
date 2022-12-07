const { Router } = require("express");
const productRoute = require("./productRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
const detailsCategoryRoute = require("./detailsCategoryRoute");
const orderItemsRoute = require("./orderItemsRoute");
// const { hardCodeoInfo } = require("../controllers/hardCode");
const userRoute = require("./userRoute");
const mercadoPago = require("./mercadoPago");
const favoriteRoute = require("./favoriteRoute");
const router = Router();

// router.use("/Guillo", async (req, res, next) => {
//   // await defaultDiscount()
//   await hardCodeoInfo();
//   console.log("ya termine");
//   next();
// });

router.use("/product", productRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);
router.use("/categoryDetails", detailsCategoryRoute);
router.use("/user", userRoute);
router.use("/favorite", favoriteRoute);
router.use("/payment", mercadoPago);
router.use("/orderItems", orderItemsRoute);

module.exports = router;