const mongoose = require("mongoose");
const user = require("../../db/front@models/user");
const cartTable = require("./carts");
const products = require("./product");

const bankSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  fname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  mobile: {
    type: String,
    required: true
  },
  paymentResponse: {
    type: Boolean,
    required: true,
    default: false
  },
  totalAmount: {
    type: Number,
    required: true
  },
  cartIds: {
    type: Array,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const paymentTable = mongoose.model("payment", bankSchema);



const addDetail = async (detail) => {
  try {

    const currentUser = await user.user.findById(detail.customerId);
    const counter = await alreadyBook(detail.customerId, detail.bankingResponse);
    if (counter >= 1) {
      return await updatePayment(currentUser, detail);
    } else {
      const payment = new paymentTable({
        cartIds: detail.cartId,
        customerId: detail.customerId,
        fname: currentUser.uname,
        email: currentUser.email,
        address: currentUser.address,
        mobile: currentUser.mobile,
        totalAmount: detail.totalamount,
        discount: detail.discount
      });
      return await payment.save();
    }
  } catch (error) {
    console.log(error)
    return error;
  }
}

const alreadyBook = async (customerId, paymentResponse) => {
  return await paymentTable.find({ customerId: customerId, paymentResponse: false }).countDocuments();
}

const updatePayment = async (currentUser, detail) => {
  const payment = {
    cartIds: detail.cartId,
    customerId: detail.customerId,
    fname: currentUser.uname,
    email: currentUser.email,
    address: detail.address,
    mobile: currentUser.mobile,
    totalAmount: detail.totalamount,
    discount: detail.discount
  };
  const updatePayment = await paymentTable.updateOne(
    { customerId: detail.customerId }, payment);
  return updatePayment;
}




const showDetail = async () => {
  try {
    return await paymentTable.find();
  } catch (error) {
    return error;
  }

}

const showDetailById = async (customerId) => {
  try {
    return await paymentTable.findOne({ customerId: customerId });
  } catch (error) {
    return error;
  }
}


const updateBankingResponse = async (customerId) => {
  try {
    const response = { paymentResponse: true };
    return await paymentTable.paymentTable.updateOne({ customerId: customerId }, response);
  } catch (error) {
    return error;
  }
}


const bankingResponse = async (customerId) => {
  try {
    return await paymentTable.find({ customerId: customerId }).where({ paymentResponse: true });
  } catch (error) {
    return error;
  }
}

const findCart = async (data) => {
  try {

    const product = await cartTable.find(
      {'_id': { $in: [...data.cartIds]}})
    return product;
  } catch (error) {
    return error
  }
}


module.exports = { paymentTable, addDetail, showDetail, showDetailById, bankingResponse, updatePayment,findCart };
