	const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
  try {
      const token=req.headers.authorization.split(" ")[1];
      const decodeToken=jwt.verify(token,"sharafat");

      req.userData={
        email:decodeToken.email,
        userid:decodeToken.userId
      }
      next();
  } catch (error) {
    res.status(401).json({
      message: "You are not Authenticated!"
    })
  }
}
