const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  commentsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});


const blogsTable = mongoose.model('blog', blogsSchema);


const addBlogs = async (blogs) => {
  try {
    const blogs = { ...blogs };
    // console.log(blogs);
    return blogs;
  } catch (error) {
    return error;
  }
}


module.exports = { blogsTable,addBlogs };
