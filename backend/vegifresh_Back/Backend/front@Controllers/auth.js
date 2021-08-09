const express = require("express");
const user = require("../db/front@models/user");
const jwt = require("jsonwebtoken");
const userSchema = require("../Validation/userValidation");
// register user
exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const exist = await user.alreadyExist(req.body.email);
    if (exist) {
      res.status(400).json({
        message: 'user already exist',
      })
    } else {
      User = await user.saveUser(req.body);
      res.status(201).json({
        message: 'user Registred',
        data: User
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Invalid Authorisation Credentials',
    })
  }
}



// login user
exports.signin = async (req, res, next) => {
  try {
    const fetchUser = await user.signin(req.body);
    if (!fetchUser) {
      return res.status(401).json({
        message: "Authentication Failed"
      })
    }
    const check = await user.check();
    if (!check) {
      return res.status(401).json({
        message: "Authentication Failed"
      })
    }
    res.status(200).json({
      message: `Welcome ${fetchUser.uname} `,
      token: await user.token(fetchUser),
      expiresIn: 3600,
      userId: fetchUser._id,
      uname: fetchUser.uname
    })
  } catch (e) {
    res.status(401).json({
      message: "Invalid authentication credential"
    })
  }
}

exports.allUsers = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const userQuery = user.user.find();
    if (pageSize && currentPage) {
      const userPost = await userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      const postCount = await user.user.countDocuments();
      res.status(200).json({
        message: 'success',
        userPost: userPost,
        postCount:postCount
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'not Found',
      error: error
    })
  }
}


