const logoTable = require("./../db/model/logo");

exports.addLogo = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const logo = new logoTable({
      title: req.body.title,
      image: url + "/images/" + req.file.filename,
    })
    const logoPost = await logo.save()
    res.status(201).json({
      message: 'Post Added Successfully',
      logoPost: logoPost
    })
  } catch (error) {
    res.status(500).json({
      message: 'failed to save LogoPost'
    })
  }
}


exports.getLogo = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const logoQuery = logoTable.find();
    if (pageSize && currentPage) {
      const logoPost = await logoQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      const count = await logoTable.count();
      res.status(201).json({
        message: 'success',
        logoPost: logoPost,
        maxPosts: count
      })
    }

  } catch (error) {
    res.status(500).json({
      message: "Fetching LogoPost failed"
    })
  }
}


exports.getLogoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const logoPostById = await logoTable.findById({ _id: id });
    res.status(200).json({
      message: "LogoPost Fetched",
      LogoPost: logoPostById
    })
  } catch (error) {
    res.status(404).json({
      message: "failed to Fetched LogoPost"
    })
  }
}


exports.updateLogoById = async (req, res, next) => {
  try {
    let imagePath = req.body.image;
    const id = req.params.id;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const logoPost = {
      title: req.body.title,
      image: imagePath
    }
    const updateLogo = await logoTable.updateOne({ _id: id }, logoPost);
    if (updateLogo.n > 0) {
      res.status(201).json({
        message: "Record Updated"
      })
    } else {
      res.status(401).json({
        message: "unauthorized user"
      })
    }

  } catch (error) {
    res.status(500).json({
      message: "Could'not update Post"
    })
  }
}


exports.deleteLogo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedLogo = await logoTable.deleteOne({ _id: id });
    res.status(204).json({
      message: "Logo Deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Logo"
    })
  }
}
