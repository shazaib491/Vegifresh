  const carts = require("./../db/model/carts");
const products = require("./../db/model/product");
const user = require("../db/front@models/user");
const { db } = require("./../db/model/carts");


exports.addTocarts = async (req, res, next) => {
  try {
    let cartStatus = req.body.cartStatus;
    let totalPrice;
    console.log(cartStatus)
    if (cartStatus === true) {
      const exist = await alreadAdded(req.body.productId, req.body.customerId);
      if (exist && req.body.quantity > 1) {
        totalPrice = req.body.quantity * req.body.p_price;
        const updateCart = await carts.findOneAndUpdate(
          { customerId: req.body.customerId, productId: req.body.productId },
          {
            "$set":
            {
              quantity: req.body.quantity,
              totalPrice: totalPrice
            }
          }
        )
        return res.status(201).json({
          message: 'qunatity updated'
        })
      }
      if (exist) {
        return res.status(400).json({
          message: 'already Exist'
        })
      }
      const cartData = new carts({
        customerId: req.body.customerId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        cartStatus: req.body.cartStatus,
        p_price: req.body.p_price,
        totalPrice: req.body.quantity * req.body.p_price
      });
      const addedTocart = await cartData.save();
      const count = await carts.find({ customerId: cartData.customerId }).countDocuments();
      res.status(201).json({
        message: "product is added to carts buckets",
        cartCount: count
      })
    } else {
      const count = await carts.find({ customerId: req.body.customerId }).countDocuments();
      const deletedcarts = await carts.findOneAndDelete({ customerId: req.body.customerId, productId: req.body.productId });
      res.status(201).json({
        message: "product is remove from carts buckets",
        cartCount: count
      })
    }

  } catch (error) {
    res.status(500).json({
      error: 'something is missing !',
      err: error
    })
  }
}

let alreadAdded = async (productId, userId) => {
  const already = await carts.find({ productId: productId, customerId: userId }).countDocuments();
  if (already > 0) {
    return true;
  } else {
    return false;
  }
}



exports.updateQuantity=async(req,res,next)=>{
  try {
    let cart=[...req.body];
    let bulkArr=[];
    let qty;
    for (const i of cart)
    {
        qty=parseInt(i.quantity);
        bulkArr.push({updateOne:
            {
                "filter": { "customerId": i.customerId,"_id":i._id },
                "update": { $set: { "quantity": qty } }
            }
          })
    }
    carts.bulkWrite(bulkArr);


  


    res.status(201).json({
      message:'quantity updated'
    })
  } catch (e) {
    res.status(500).json({
      message:'quantity not updated'
    })
  }
}


exports.getCarts = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    if (pageSize && currentPage) {
      const response = await db.collection('carts').aggregate([
        {
          $lookup:
          {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'productdetail'
          }
        },
        {
          "$unwind": "$productdetail"
        },
        {
          $lookup:
          {
            from: 'user@fronts',
            localField: 'customerId',
            foreignField: '_id',
            as: 'userdetail'
          }
        },
        {
          "$unwind": "$userdetail"
        },
        {
          $project: {
            "_id": 1,
            "customerId": 1,
            "productId": 1,
            "quantity": 1,
            "p_price": 1,
            "totalPrice": 1,
            "productdetail._id": 1,
            "productdetail.p_name": 1,
            "productdetail.p_img": 1,
            "userdetail._id": 1,
            "userdetail.uname": 1,

          }
        },
        { $skip: pageSize * (currentPage - 1) },
        { $limit: pageSize }
      ]).toArray();

      const count = await carts.countDocuments();

      res.status(200).json({
        message: 'success',
        cartdetail: response,
        maxPosts: count,
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fetching Cart failed"
    })
  }
}

exports.totalCart=async(req,res,next)=>{
  try{
    const count = await carts.find({ customerId: req.userData.userid }).countDocuments();
    res.status(200).json({
      message: 'Total Carts',
      count: count
    })
  }catch(e){
    res.status(500).json({
      message: 'cart bukcet is empty!',
      error: e
    })
  }
}
//
// const response = await db.collection('carts').aggregate([
//   {
//     $lookup:
//     {
//       from: 'products',
//       localField: 'productId',
//       foreignField: '_id',
//       as: 'productdetail'
//     }
//   },
//   {
//     "$unwind": "$productdetail"
//   },
//   {
//     $lookup:
//     {
//       from: 'user@fronts',
//       localField: 'customerId',
//       foreignField: '_id',
//       as: 'userdetail'
//     }
//   },
//   {
//     "$unwind": "$userdetail"
//   },
//   {
//     $project: {
//       "_id": 1,
//       "customerId": 1,
//       "productId": 1,
//       "quantity": 1,
//       "p_price": 1,
//       "totalPrice": 1,
//       "productdetail._id": 1,
//       "productdetail.p_name": 1,
//       "productdetail.p_img": 1,
//       "userdetail._id": 1,
//       "userdetail.uname": 1,
//
//     }
//   }
// ]).toArray();

exports.getAllcarts = async (req, res, next) => {
  try {
    const response = await db.collection('carts').aggregate([
     {

         $lookup:
         {
           from: 'products',
           localField: 'productId',
           foreignField: '_id',
           as: 'productdetail'
         }
       },
       {
         "$unwind": "$productdetail"
       },
     {
       $project: {
         "_id": 1,
         "customerId": 1,
         "productId": 1,
         "quantity": 1,
         "p_price": 1,
         "totalPrice": 1,
         "cartStatus":1,
         "productdetail._id": 1,
         "productdetail.p_name": 1,
         "productdetail.p_img": 1,
         "productdetail.discount": 1,
         "productdetail.p_disc": 1,
       }
     }
   ]).toArray();
   const cartBucket=response.filter((data)=>data.customerId==req.userData.userid);

    let IdArray = [];
    const allCarts = await carts.find({ customerId: req.userData.userid });
    for (var i = 0; i < allCarts.length; i++) {
      IdArray.push(`${allCarts[i].productId}`);
    }
    const allProduct = await products.find().where('_id').in(IdArray).exec();




    const count = await carts.find({ customerId: req.userData.userid }).countDocuments();
    res.status(200).json({
      message: 'All carts fetched',
      carts: allCarts,
      product: allProduct,
      bucket:cartBucket,
      count: count
    })


  } catch (error) {
    res.status(500).json({
      message: 'cart bukcet is empty!',
      error: error
    })
  }
}
