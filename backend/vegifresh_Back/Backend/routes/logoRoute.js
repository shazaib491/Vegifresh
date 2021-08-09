const express = require("express");
const router = express.Router();
const { addLogo, getLogo, getLogoById, updateLogoById, deleteLogo } = require("./../controller/logo");
const checkFile = require("./../middleware/checkfile");
const checkauth = require("./../middleware/checkauth");

router.post("/addLogo", checkauth, checkFile, addLogo);
router.get("/getLogo", checkauth, getLogo);
router.get("/getLogoById/:id", checkauth, getLogoById);
router.put("/updateLogoById/:id", checkauth, checkFile, updateLogoById);
router.delete("/deleteLogo/:id", checkauth, deleteLogo);


module.exports = router;
