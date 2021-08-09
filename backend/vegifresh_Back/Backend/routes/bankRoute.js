const express = require("express");
const { addBank, showBank, CustomerBankId,updatePayment,bankingResponse,verifyPayment } = require("../controller/bank");
const router = express.Router();
const checkauth = require("./../middleware/checkauth");
router.post("/", addBank);
router.post("/orderPayment", checkauth,updatePayment);
router.post("/verifyPayment",checkauth,verifyPayment);
router.get("/", showBank);
router.get("/CustomerBankId",checkauth, CustomerBankId);
router.get("/purchasedProduct", bankingResponse);


module.exports = router;
