const Joi = require('joi');

function userValidation(req,res,next) {
  const userSchema = Joi.object({
    uname: Joi.string().alphanum().max(30).required().messages({
      "string.base": "Sorry! It looks like something went wrong. Please try later",
      "string.empty": "Uname is not allowed to be empty",
      "any.required": "Uname  is required"
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    mobile: Joi.string().alphanum().min(10).messages({
      "string.base": "Phone code must be valid",
      "string.empty": "Phone code must be valid",
      "string.min": "Phone code must be valid be 10 digit",
      "any.required": "Phone code must be valid"
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')
  })

  const validate = userSchema.validate(req.body);
  if(validate.error){
  const message=validate.error.details[0].message;
  
res.writeHead(500, {'Content-Type': 'text/event-stream'});

return res.end(message);

   // res.end({
//       'message': 'Invalid Authorisation Credentials',
//      'message': validate.error.details[0].message
//	json.Stringify('message': validate.error.details[0].message);
    //})

  }
  next();


}




function loginValidation(req,res,next){
  const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required()
  })

  const validate = userSchema.validate(req.body);
  if(validate.error){
    res.status(500).json({
      // 'message': 'Invalid Authorisation Credentials',
      'message': validate.error.details[0].message
    })

  }
  next();

}





module.exports = {userValidation,loginValidation};






