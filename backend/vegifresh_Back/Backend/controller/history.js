const { db } = require("../db/model/history");
const  booking  = require("../db/model/history");
const  product  = require("../db/model/product");

exports.addHistory = async (req, res, next) => {
  try {
    const history = await addHistory(req.body);
    res.status(201).json({
      message: "hisotry Saved"
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to save history"
    })
  }
}

exports.getHistory = async (req, res, next) => {
  try {
//    user@fronts



    const response =await   db.collection('purchasehistories').aggregate([
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
      // {
      //   $lookup:
      //   {
      //     from: 'user@fronts',
      //     localField: 'customerId',
      //     foreignField: '_id',
      //     as: 'userdetail'
      //   }
      // },
      // {
      //   "$unwind": "$userdetail"
      // },
        {
          $project: {
            "_id": 1,
            "qty": 1,
            "amount": 1,
            "purchasedAt": 1,
            "status": 1,
            "productdetail._id": 1,
            "productdetail.p_name": 1,
            "productdetail.p_img" : 1,
            "productdetail.p_disc" : 1,
            "userdetail._id": 1,
            "userdetail.uname": 1,
          }
        },
    ]).toArray()
    res.status(200).json({
      booking:response
    })
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch book",
      error: error
    })
  }


  let product=[];
  const products=await booking.find({customerId:req.userData.userid});
  for (var item of products) {
    product.push(...item.productId);
  }
  console.log(product);
//   product.find({
//     'productId': { $in: [
//         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
//         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
//         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
//     ]}
// }, function(err, docs){
//      console.log(docs);
// });
}
