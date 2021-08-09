const topbarTable = require("./../db/model/topBar")

exports.topbar = async (req, res, next) => {
  try {
    const top = new topbarTable({
      email: req.body.email,
      mobile: req.body.mobile
    })
    const response = await top.save();
    if (response) {
      res.status(201).json({
        message: "Record Inserted",
      })
    }

  } catch (error) {
    res.status(403).json({
      err: error,
      message: "record not inserted"
    })
  }
}

exports.displayTopbar = async (req, res, next) => {
  // http://localhost:3000/header/displayTopbar?pageSize=4&page=1
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    console.log(currentPage);
    // console.log(pageSize * (currentPage - 1));
    const postQuery = topbarTable.find()
    if (pageSize && currentPage) {
      const data = await postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
      const count = await topbarTable.count();
      return res.status(200).json({
        message: "Post fetched Successfully",
        post: data,
        maxPosts: count
      })
    }
  } catch (error) {
    return res.status(204).json({
      error: error,
      data: ""
    })
  }
}


exports.getTopbar = async (req, res, next) => {
  try {
    const id = req.params.id;

    const getdata = await topbarTable.findById({ _id: id })
    res.status(200).json({
      response: getdata
    })
  } catch (error) {
    res.status(404).json({
      data: "data not found"
    })
  }
}

exports.updateTopbar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await topbarTable.updateOne({ _id: id }, { email: req.body.email, mobile: req.body.mobile })
    res.status(200).json({
      success: true,
      message: updated
    })
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "data not updated"
    })
  }

}

exports.deleteTopbar = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await topbarTable.deleteOne({ _id: id })
    res.status(204).json({
      message: "data deleted"
    })
  } catch (error) {
    res.status(403).json({
      message: "data not deleted"
    })
  }

}
