const express = require("express");
const slideTable = require("../db/model/slide");
const router = express.Router();
const logoTable = require("./../db/model/logo");
const headerTable = require("./../db/model/topBar");
const productTable = require("./../db/model/product");
const categoryTable = require("./../db/model/category");

router.get("/logo", async (req, res, next) => {
  try {
    const logo = await logoTable.findOne();
    res.status(200).json({
      message: 'logo Fetched',
      logo: logo

    })
  } catch (error) {
    res.status(500).json({
      message: 'somthingi is wrong'
    })
  }
})


router.get("/header", async (req, res, next) => {
  try {
    const header = await headerTable.findOne();
    res.status(200).json({
      message: 'header Fetched',
      header: header

    })
  } catch (error) {
    res.status(500).json({
      message: 'somthingi is wrong'
    })
  }
})



router.get("/slider", async (req, res, next) => {
  try {
    const slider = await slideTable.find();
    res.status(200).json({
      message: 'slider Fetched',
      slider: slider

    })
  } catch (error) {
    res.status(500).json({
      message: 'somthingi is wrong'
    })
  }
})


router.get("/product", async (req, res, next) => {
  try {
    const product = await productTable.find();
    const category = await categoryTable.find();
    res.status(200).json({
      message: 'product Fetched',
      product: product,
      category: category

    })
  } catch (error) {
    res.status(500).json({
      message: 'somthingi is wrong'
    })
  }
})


router.get("/productbyId/:category", async (req, res, next) => {
  try {
  let category=req.params.category;

    const product = await productTable.find({category:category});
    console.log(product);
    res.status(200).json({
      message: 'product Fetched by id',
      product: product,
    })
  } catch (error) {
    res.status(500).json({
      message: 'somthingi is wrong'
    })
  }
})


module.exports = router;
