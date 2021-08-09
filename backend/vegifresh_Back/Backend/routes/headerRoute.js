const express = require("express")
const router = express.Router();
const { topbar, displayTopbar, deleteTopbar,getTopbar,updateTopbar } = require("./../controller/topBar")
const checkauth=require("./../middleware/checkauth");
router.post("/addTopbar",checkauth, topbar)
router.get("/displayTopbar",checkauth, displayTopbar)
router.get("/displayTopbarbyId/:id",checkauth, getTopbar)
router.put("/updateTopbarbyId/:id",checkauth, updateTopbar)
router.delete("/deleteTopbar/:id",checkauth, deleteTopbar)

module.exports = router
