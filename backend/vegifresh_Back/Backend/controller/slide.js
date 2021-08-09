const slideTable = require("./../db/model/slide");

exports.insertSlide = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const slider = new slideTable({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: url + "/images/" + req.file.filename
    })
    const slides = await slider.save();
    res.status(201).json({
      message: "slide saved successfully"
    })
  } catch (error) {
    res.status(204).json({
      message: "slides not saved"
    })

  }
}


exports.getSlide = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const slidesQuery = slideTable.find();
    if (pageSize && currentPage) {
      const sliderPost = await slidesQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      const count = await slideTable.countDocuments();
      res.status(200).json({
        message: "Slides Fetched",
        slides: sliderPost,
        maxPosts: count
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to fetched"
    })
  }
}

exports.getSlideById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sliders = await slideTable.findById({ _id: id })
    res.status(200).json({
      message: "slides fetched",
      slides: sliders
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}


exports.updateSlideById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let imagePath = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const slidePost = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: imagePath
    }
    const updatedSlides = await slideTable.updateOne({ _id: id }, slidePost);
    if (updatedSlides.n > 0) {
      res.status(201).json({
        message: "slides Updated"
      })
    }
  } catch (error) {
    res.json({
      message: "slides not udpated"
    })
  }
}


exports.deleteSlide = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedSlides = await slideTable.deleteOne({ _id: id });
    res.status(204).json({
      message: "slides Deleted"
    })
  } catch (error) {
    res.status(500).json({
      message: "sliders not Deleted"
    })
  }
}
