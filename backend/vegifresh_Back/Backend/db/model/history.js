const mongoose = require("mongoose");
const { db } =require("./../connect");
const historySchema = mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  productId: {
    type: Array,
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  },
  qty: {
    type: Number
  },
  amount: {
    type: Number,
    required: true
  },
  status:{
    type:Boolean,
    required:true,
    default:false
  }
})

module.exports= mongoose.model("purchaseHistory", historySchema);
