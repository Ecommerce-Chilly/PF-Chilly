const { Router } = require("express");
const productRoute = require("./productRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
const detailsCategoryRoute = require("./detailsCategoryRoute");
<<<<<<< HEAD
const favoritesRoute = require("./favoriteRoute");
const { hardCodeoInfo } = require("../controllers/hardCode");
const { userRoute } = require("./userRoute");
const { orderDetailRoutes } = require("./orderDetailsRoute");

=======
const orderItemsRoute = require("./orderItemsRoute")
const { hardCodeoInfo } = require("../controllers/hardCode");
const userRoute = require("./userRoute")
const mercadoPago = require('./mercadoPago')
const favoriteRoute = require('./favoriteRoute')
>>>>>>> 620647c6952243495d539c1e70f26b4f66e3e02a
const router = Router();

router.use("/Guillo", async (req, res, next) => {
  // await defaultDiscount()
  await hardCodeoInfo();
  console.log("ya termine");
  next();

});

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);
router.use("/categoryDetails", detailsCategoryRoute);
<<<<<<< HEAD
router.use("/user", userRoute);
router.use("/favorite", favoritesRoute);
router.use("/orderdetails", orderDetailsRoute);
=======
router.use("/user", userRoute)
router.use("/favorite", favoriteRoute)
router.use("/payment", mercadoPago)
router.use("/orderItems", orderItemsRoute)
>>>>>>> 620647c6952243495d539c1e70f26b4f66e3e02a

module.exports = router;
