const router = require("express").Router();
const { getCartItem } = require("../controllers/addCartItem___");

router.use("/cartitems", getCartItem);

module.exports = router;
