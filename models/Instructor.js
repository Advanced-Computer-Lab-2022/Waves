var mongoose = require("mongoose");
var InstructorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Array,
   
  },
  reviews: {
    type: Array,
    required: true,
  },
  token: {
    type: String
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;