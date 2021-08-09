const express = require("express");
const router = express.Router();
const { addTocarts, getAllcarts,getCarts,totalCart,updateQuantity } = require("./../controller/cart");
const checkauth = require("./../middleware/checkauth");
router.post("/addTocart", addTocarts);
router.get("/getAllcarts",checkauth, getAllcarts);
router.get("/allcarts",checkauth, getCarts);
router.get("/totalCart",checkauth, totalCart);
  router.post("/updationQtyArr",checkauth, updateQuantity);



module.exports = router;
