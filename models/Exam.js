var mongoose = require("mongoose");
var ExamSchema = new mongoose.Schema({
  belongsToCourse: {
    type: String,
    required: true,
  }
});
var Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;