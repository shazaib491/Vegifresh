const mongoose = require("mongoose");

const cartScehma = mongoose.Schema({
  p_img: {
    type: String,
    required: true
  },
  p_name: {
    type: String,
    required: true,
  },
  p_disc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  p_price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  stock: {
    type: String,
    required: true
  },
  stock_range: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  wishlistStatus: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

const products = mongoose.model("product", cartScehma);

module.exports = products;
