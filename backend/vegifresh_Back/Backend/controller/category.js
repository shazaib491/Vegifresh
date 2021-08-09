const categoryTable = require("../db/model/category");

exports.addCategory = async (req, res, next) => {
  try {
    let catename = req.body.category;
    let categories = new categoryTable({
      catename: catename
    })
    await categories.save()
    res.status(201).json({
      "message": 'Category is Added'
    })
  } catch (error) {
    res.status(500).json({
      "message": "Somthing is missing "
    })
  }
}


exports.getAllCategory = async (req, res, next) => {
  try {
    const Allcatgory = await categoryTable.find();
    res.status(201).json({
      message: 'Catagory Fetched',
      category: Allcatgory
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something is wrong'
    })
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const categoryQuery = categoryTable.find();
    console.log(currentPage, pageSize);
    if (pageSize && currentPage) {
      const categoryPost = await categoryQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);

      const count = await categoryTable.countDocuments();
      res.status(200).json({
        message: "catgeory Fetched",
        category: categoryPost,
        maxPosts: count
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Fetching Post Failed"
    })
  }
}


exports.getcategoryByid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await categoryTable.findById({ _id: id })
    res.status(200).json({
      message: 'Category fetched',
      category: category
    })

  } catch (error) {
    res.status(500).json({
      message: "failed to fetched"
    })
  }
}

exports.updateCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = {
      catename: req.body.category
    }
    const updatedCategory = await categoryTable.updateOne({ _id: id }, updatedData);
    if (updatedCategory.n > 0) {
      res.status(201).json({
        message: "Record Updated"
      })
    }
  } catch (error) {
    res.status(401).json({
      message: "unauthorized user",
      error: error
    })
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await categoryTable.deleteOne({ _id: id });
    console.log(category);
    res.status(204).json({
      message: "category Deleted"
    })

  } catch (error) {
    res.status(500).json({
      message: "failed to delete Category",
      error: error
    })
  }
}
