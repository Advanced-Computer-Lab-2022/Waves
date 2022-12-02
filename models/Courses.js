var mongoose = require("mongoose");
var CoursesSchema = new mongoose.Schema({
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
  }
});
var Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;