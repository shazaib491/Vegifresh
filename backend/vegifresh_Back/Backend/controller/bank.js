const paymentTable = require("../db/model/bank");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const  history  = require("../db/model/history");
const  carts  = require("../db/model/carts");


let instance = new Razorpay({
  key_id: 'rzp_test_6pkBsTKr8DpzCx', // your `KEY_ID`
  key_secret: 'kfBTm5mAYemCjMonQxiL2Y1K' // your `KEY_SECRET`
})




exports.addBank = async (req, res, next) => {
  try {
    const payment = await paymentTable.addDetail(req.body);
    if (payment.errors) throw payment.errors;
    res.status(201).json({
      message: "information saved"
    })

  } catch (error) {
    res.status(500).json({
      message: "Failed To save ",
      error: error
    })
  }
}

exports.updatePayment = async (req, res, next) => {
  try {
    const bankDetail = await paymentTable.showDetailById(req.userData.userid);

    const amountParams = {
      amount: bankDetail.totalAmount,
      currency: "INR",
      receipt: "su001",
      payment_capture: '1'
    };
    const order = await instance.orders.create(amountParams).then((data) => {
      res.status(200).json({
        message: 'orderId Fetched',
        orders: data
      })
    }).catch((error) => {
      res.status(500).json({
        message: 'Failed to  Fetched orderId ',
        orders: error
      })
    })
  } catch (e) {
    res.send({ "sub": e, "status": "failed" });

  }
}

exports.verifyPayment = async (req, res, next) => {
  try {
    const bankDetail = await paymentTable.showDetailById(req.userData.userid);
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const cardDetail = await paymentTable.findCart(bankDetail);
    let productId=[];
    let qty=0;
    cardDetail.forEach(element=>{
      qty+=element.quantity;
      productId.push(element.productId);
    })
    const expectedSignature = expectedsignature(body);
    if (expectedSignature === req.body.razorpay_signature) {
      const record = new history({
        customerId: bankDetail.customerId,
        orderId: req.body.razorpay_order_id,
        paymentId: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        productId: productId,
        qty: qty,
        amount: req.body.amount
      })
      const histroys =await record.save();
      const data=await deleteFromCarts(bankDetail.customerId,productId);
      console.log(data);
      res.status(201).json({
        message: "Transaction successfully",
        history: histroys,
      })
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Transaction Failed",
      error:e
    })
  }
}


const deleteFromCarts=async(customerId,productId)=>{
  try {
      const response= await carts.deleteMany({customerId:customerId});
      return response;
  } catch (e) {
    return e;
  }
}


const expectedsignature = (body) => {
  return crypto.createHmac('sha256', 'kfBTm5mAYemCjMonQxiL2Y1K')
    .update(body.toString())
    .digest('hex');
}


exports.showBank = async (req, res, next) => {
  try {
    const bankDetail = await paymentTable.showDetail();

    res.status(200).json({
      message: 'Information Fetched',
      bankDetail: bankDetail

    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetched"
    })
  }
}


exports.CustomerBankId = async (req, res, next) => {
  try {
    const bankDetail = await paymentTable.showDetailById(req.userData.userid);

    res.status(200).json({
      message: 'Information Fetched',
      bankDetail: bankDetail

    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetched"
    })
  }
}


exports.bankingResponse = async (req, res, next) => {
  try {
    const bankingResponse = await paymentTable.bankingResponse(req.query.CustomerId);
    res.status(200).json({
      message: 'Purchased Products',
      response: bankingResponse

    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetched"
    })
  }
}
