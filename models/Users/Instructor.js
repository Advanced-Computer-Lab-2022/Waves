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
  email: {
    type: String
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
  profilePic:{
    type: String,
  },
  //https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
  token: {
    type: String
  },
  country: {
    type:String
  },
  bio:{
    type: String
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;