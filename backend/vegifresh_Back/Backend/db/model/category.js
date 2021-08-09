const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  catename: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})


const category = mongoose.model('catgeory', categorySchema);

module.exports = category;
