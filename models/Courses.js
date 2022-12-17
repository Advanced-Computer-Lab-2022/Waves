const mongoose = require("mongoose");
const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //unique: true
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  videoPreview: {
    type: String,
    required: true,
  },
  subtitles: {
    type: Array,
    required: true,
  },
  videoLinks: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  rating: {
    type: Array,
  },
  subject: {
    type: String,
    required: true,
  },
  givenBy: {
    type: String,
    required: true
  },
  reviews: {
    type: Array,
  },
  reports: {
    type: Array
  }
});
const Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;