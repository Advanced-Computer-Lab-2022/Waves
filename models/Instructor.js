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
  email:{
    type: String,
  },
  biography:{
    type: String
  },
  rating: {
    type: Array,
   
  },
  reviews: {
    type: Array,
  },
  token: {
    type: String
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;