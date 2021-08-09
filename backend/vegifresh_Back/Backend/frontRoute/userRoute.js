const express = require("express");
const router = express.Router();
const { signup, signin,allUsers } = require("../front@Controllers/auth");
const schema = require("../Validation/userValidation");
router.post("/signup", schema.userValidation, signup);
router.post("/signin",schema.loginValidation, signin);
router.get("/Users", allUsers);

module.exports = router;
