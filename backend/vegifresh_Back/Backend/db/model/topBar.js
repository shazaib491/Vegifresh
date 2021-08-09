const table = require("./../connect")
const uniqueValidator = require("mongoose-unique-validator")
const topBarschema = table.Schema({
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true
  }
})

topBarschema.plugin(uniqueValidator)

const topBarTable = table.model("topBar", topBarschema)

module.exports = topBarTable;
