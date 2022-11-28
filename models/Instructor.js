let mongoose = require("mongoose");
let InstructorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;