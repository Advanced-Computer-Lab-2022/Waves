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
  inbox: {
    type: Array,
    require: false
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;