const express = require("express");
const router = express.Router();
const checkFile = require("./../middleware/checkfile");
const { insertSlide, getSlide, getSlideById,updateSlideById, deleteSlide } = require("./../controller/slide");


router.post("/insertSlide", checkFile, insertSlide);
router.get("/getSlide", getSlide);
router.get("/getSlidebyId/:id", getSlideById);
router.put("/updateSlidebyId/:id",checkFile, updateSlideById);
router.delete("/deleteSlides/:id", deleteSlide);


module.exports = router;
