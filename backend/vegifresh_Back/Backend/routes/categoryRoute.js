const express = require("express");
const { addCategory, getCategory, getcategoryByid, getAllCategory,deleteCategory, updateCategoryById } = require("../controller/category");
const checkauth = require("../middleware/checkauth");
const router = express.Router();


router.post('/addCategory', checkauth, addCategory);
router.get('/category', checkauth, getCategory);
router.get('/allcategory', checkauth, getAllCategory);
router.get('/categoryByid/:id', checkauth, getcategoryByid)
router.put('/updateCategoryByid/:id', checkauth, updateCategoryById)
router.delete('/deletecategoryByid/:id', checkauth, deleteCategory)

module.exports = router;
