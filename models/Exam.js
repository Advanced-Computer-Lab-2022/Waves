var mongoose = require("mongoose");
var ExamSchema = new mongoose.Schema({
  belongsToCourse: {
    type: String,
    required: true,
  },
  name: {
    type:String,
    required: true,
  },
  questions: {
    type: Array,
    default: []
  }
});
var Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;