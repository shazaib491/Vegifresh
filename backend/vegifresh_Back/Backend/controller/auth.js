const authTable = require("./../db/model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  saltRound = 10;
  try {
    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({
        error: "failed to Registered",
        message: "password must be same"
      })
    }
    const password = await bcryptjs.hash(req.body.password, saltRound);
    const data = new authTable({
      email: req.body.email,
      password: password,
      mobile: req.body.mobile
    })
    const response = await data.save()
    return res.status(201).json({
      message: "User Registred",
      result: response
    })
  }
  catch (e) {
    res.status(500).json({
      message: "Invalid Authorisation Credentials!"
    })
  }
}



exports.userLogin = async (req, res, next) => {
  try {
    const fetchUser = await authTable.findOne({ email: req.body.email })
    if (!fetchUser) {
      return res.status(401).json({
        message: "Authentication Failed"
      })
    }
    const check = await bcryptjs.compare(req.body.password, fetchUser.password)
    if (!check) {
      return res.status(401).json({
        message: "Authentication Failed"
      })
    }
    const token = jwt.sign({
      email: fetchUser.email,
      userId: fetchUser._id
    },
      "sharafat",
      {
        expiresIn: "1h"
      }
    )
    res.status(200).json({
      message:`Welcome Admin`,
      token: token,
      expiresIn: 3600,
      userId: fetchUser._id
    })
  } catch (e) {
    res.status(401).json({
      message: "Invalid authentication credential"
    })
  }
}
