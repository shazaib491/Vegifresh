const blogs = require("../db/model/blogs");


exports.addBlogs = async (req, res, next) => {
  try {
    const blogs = await blogs.addBlogs(req.body);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetched data"
    })
  }
}
