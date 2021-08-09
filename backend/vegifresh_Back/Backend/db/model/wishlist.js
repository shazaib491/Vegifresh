const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  customerId:{
      type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports=wishlist;
