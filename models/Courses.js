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
  },
  totalHours: {
    type: Number,
    required: true,
  },
  courseRating: {
    type: Number,
    required: false,
  },
});
var Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;