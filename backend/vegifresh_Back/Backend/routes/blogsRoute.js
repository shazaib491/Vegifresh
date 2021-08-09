const express = require("express");
const { addBlogs } = require("../controller/blogs");
const router = express.Router();

router.post("/addBlogs", addBlogs);




module.exports = router;
