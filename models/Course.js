const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
const Course = mongoose.model("Course", UserSchema);
module.exports = Course;