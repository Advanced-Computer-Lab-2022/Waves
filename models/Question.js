var mongoose = require("mongoose");
var QuestionSchema = new mongoose.Schema({
  belongsToExam: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true
  },
  c1: {
    type: String,
    required: true,
  },
  c2: {
    type: String,
    required: true,
  },
  c3: {
    type: String,
    required: true,
  },
  c4: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  }
});
var Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;