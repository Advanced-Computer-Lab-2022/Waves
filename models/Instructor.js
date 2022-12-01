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
    type: String,
   
  },
  reviews: {
    type: Array,
    required: true,
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;