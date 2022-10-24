const mongoose = require("mongoose");
const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //unique: true
  },
  subtitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortSummary: {
    type: String,
    required: true,
  }
});
var Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;