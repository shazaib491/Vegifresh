const express = require("express");
const router = express.Router();
const { register, userLogin } = require("./../controller/auth");

router.post("/signup", register);
router.post("/signin", userLogin);

module.exports = router;
