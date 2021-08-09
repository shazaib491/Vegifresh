const wishlist = require("../db/model/wishlist");
const { db } = require("./../db/model/carts");

exports.addWishList = async (req, res, next) => {
  try {
    console.log(req.body)
    let wishlistStatus = req.body.wishlist;
    console.log(wishlistStatus);
    let totalPrice;

    if (wishlistStatus === true) {
      const exist = await alreadAdded(req.body.productId, req.body.customerId);
      if (exist && req.body.quantity > 1) {
        totalPrice = req.body.quantity * req.body.p_price;
        const updatewishlist = await wishlist.findOneAndUpdate(
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

      const wishlistData = new wishlist({
        customerId: req.body.customerId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        cartStatus: req.body.cartStatus,
        p_price: req.body.p_price,
        totalPrice: req.body.quantity * req.body.p_price
      });
      const addedTowishlistData = await wishlistData.save();
      const count = await wishlist.find({ customerId: wishlistData.customerId }).countDocuments();
      res.status(201).json({
        message: "product is added to Wishlist buckets",
        cartCount: count
      })
    } else {
      const deletedWishlist = await wishlist.findOneAndDelete({ customerId: req.body.customerId, productId: req.body.productId });
      res.status(201).json({
        message: "product is remove from wishlist buckets",
      })
    }

  } catch (error) {
    res.status(500).json({
      error: 'something is missing in your wishlist!',
      err: error
    })
  }
}





let alreadAdded = async (productId, userId) => {
  const already = await wishlist.find({ productId: productId, customerId: userId }).countDocuments();
  if (already > 0) {
    return true;
  } else {
    return false;
  }
}



exports.showWish = async (req, res, next) => {
  try {
   
      const response = await db.collection('wishlists').aggregate([
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
            "customerId":1,
            "productId":1,
            "quantity":1,
            "p_price":1,
            "totalPrice":1,
            "productdetail.p_name": 1,
            "productdetail.p_img": 1,
            "productdetail.status": 1,
            "userdetail.uname": 1,

          }
        },
      ]).toArray();
      const count = await wishlist.countDocuments();
      console.log(count)
      res.status(200).json({
        message: 'success',
        wishlistdetail: response,
        maxPosts: count,
      })
    

  } catch (error) {
    console.log(error)

  }

}

exports.showWishlist = async (req, res, next) => {
  try {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    if (pageSize && currentPage) {
      const response = await db.collection('wishlists').aggregate([
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
            "customerId":1,
            "productId":1,
            "quantity":1,
            "p_price":1,
            "totalPrice":1,
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

      const count = await wishlist.countDocuments();

      res.status(200).json({
        message: 'success',
        wishlistdetail: response,
        maxPosts: count,
      })
    }

  } catch (error) {

  }
}

