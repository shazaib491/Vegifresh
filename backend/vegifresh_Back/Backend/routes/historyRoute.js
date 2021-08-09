const express=require("express");
const { addHistory,getHistory } = require("../controller/history");
const checkauth = require("../middleware/checkauth");
const router=express.Router();

router.post("/history",addHistory);
router.get("/",checkauth,getHistory);
router.get("");
router.put("");
router.delete("");


module.exports=router;
