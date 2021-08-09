const table = require("./../connect");
const uniqueValidator = require("mongoose-unique-validator");
const logoSchema = table.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }

})

logoSchema.plugin(uniqueValidator);
const logoTable = table.model("logo", logoSchema);
module.exports = logoTable;
