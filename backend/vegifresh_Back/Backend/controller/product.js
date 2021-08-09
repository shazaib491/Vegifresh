const productTable = require("./../db/model/product");

exports.addProduct = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const product = new productTable({
      p_img: url + "/images/" + req.file.filename,
      p_name: req.body.p_name,
      p_disc: req.body.p_disc,
      category: req.body.category,
      p_price: req.body.p_price,
      discount: req.body.discount,
      stock: req.body.stock,
      stock_range: req.body.stock_range,
      status: 0
    })
    const products = await product.save()
    res.status(201).json({
      message: "product Saved"
    })
  } catch (error) {
    res.status(204).json({
      message: "product not Saved"
    })
  }
}

exports.getProducts = async (req, res, next) => {
  try {

    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const logoQuery = productTable.find()

    if (pageSize && currentPage) {
      const Products = await logoQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      const count = await productTable.count();
      res.status(201).json({
        message: 'success',
        products: Products,
        maxPosts: count
      })
    }
  } catch (error) {
    console.log(error);
  }

}

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productTable.findById({ _id: id })
    res.status(200).json({
      message: "Product fetched",
      product: product
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

exports.updateProductById = async (req, res, next) => {
  try {
    let imagePath = req.body.image;
    const id = req.params.id;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }

    const productPost = {
      p_img: imagePath,
      p_name: req.body.p_name,
      p_disc: req.body.p_disc,
      category: req.body.category,
      p_price: req.body.p_price,
      discount: req.body.discount,
      stock: req.body.stock,
      stock_range: req.body.stock_range,
      status: 1
    }
    const updateLogo = await productTable.updateOne({ _id: id }, productPost);
    if (updateLogo.n > 0) {
      res.status(201).json({
        message: "Record Updated"
      })
    }
  } catch (error) {
    res.status(401).json({
      message: "unauthorized user"
    })
  }
}
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productTable.deleteOne({ _id: id });
    res.status(204).json({
      message: "Product Deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Product"
    })
  }
}

