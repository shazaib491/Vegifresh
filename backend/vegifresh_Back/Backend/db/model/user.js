const table = require("./../connect");
const uniqueValidator = require("mongoose-unique-validator");
const userTableSchema = table.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
})
userTableSchema.plugin(uniqueValidator)

const userTable = table.model("users", userTableSchema);




module.exports = userTable;
