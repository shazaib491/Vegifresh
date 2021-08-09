const mongoose = require("mongoose");
const uniqueValdators = require("mongoose-unique-validator");
const slideSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  image: {
    type: String,
    unique: true
  }
})

slideSchema.plugin(uniqueValdators);
const slideTable = mongoose.model("slide", slideSchema);
module.exports = slideTable

