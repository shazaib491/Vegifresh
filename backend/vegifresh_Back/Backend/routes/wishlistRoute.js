const express = require("express");
const router = express.Router();
const { addWishList, showWishlist,showWish } = require("../controller/wishlist");

router.post("/addWishList", addWishList);
router.get("/showWishList", showWishlist);
router.get("/showWish", showWish);


module.exports=router;


