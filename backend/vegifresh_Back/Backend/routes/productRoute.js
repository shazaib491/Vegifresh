const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProductById, deleteProduct } = require("../controller/product");
const checkFile = require("../middleware/checkfile");
const checkauth = require("../middleware/checkauth");

router.post("/addProduct", checkauth, checkFile, addProduct);
router.get("/getProducts", checkauth, getProducts);
router.get("/getProductById/:id", checkauth, getProductById);
router.put("/updateProductById/:id", checkauth, checkFile, updateProductById);
router.delete("/deleteProduct/:id", checkauth, deleteProduct);


module.exports = router;
