var mongoose = require("mongoose");
var CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //unique: true
  },
  subtitles: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  rating: {
    type: Array,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  img:{
    type: String,
    required: true,
  },
  givenBy: {
    type: String,
    required: true
  }
});
var Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;