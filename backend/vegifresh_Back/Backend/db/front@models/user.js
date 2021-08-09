const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userTableSchema = mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
})
userTableSchema.plugin(UniqueValidator);

const user = mongoose.model("user@front", userTableSchema);

//hashing password
const bcrypt = async (password) => {
  try {
    return await bcryptjs.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
}
//saving user or singnup
const saveUser = async (users) => {
  try {
    const data = new user({
      uname: users.uname,
      email: users.email,
      mobile: users.mobile,
      password: await bcrypt(users.password)
    })
    return await data.save();
  } catch (error) {
    return error;
  }
}
let loginUser;
let bcryptPassword;
//checking already exist
const alreadyExist=async(email)=>{
  try {
    const data= await user.findOne({email:email}).countDocuments();
    if(data > 0){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    return error;
  }
}



//singin
const signin = async (users) => {
  try {
    bcryptPassword = users.password;
    loginUser = await user.findOne({ email: users.email,role:'user'});
    return loginUser;
  } catch (error) {
    return error;
  }
}



//generate token
const token = async (fetchUser) => {
  try {
    return jwt.sign({
      email: fetchUser.email,
      userId: fetchUser._id
    },
      "sharafat",
      {
        expiresIn: "1h"
      }
    )
  } catch (error) {
    return error;
  }
}

//validate password
  const check = async () => {
    try {
       return  await bcryptjs.compare(bcryptPassword, loginUser.password);
    } catch (error) {
      return false;
    }
  }

module.exports = { user, saveUser, signin, token ,check,alreadyExist};
