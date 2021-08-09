const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product'
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  p_price: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  cartStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date
  },
  updateAt: {
    type: Date
  }
})
const cartTable = mongoose.model('cart', cartSchema);

module.exports = cartTable;
