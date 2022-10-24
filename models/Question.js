var mongoose = require("mongoose");
var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  choice_A: {
    type: String,
    required: true,
  },
  choice_B: {
    type: String,
    required: true,
  },
  choice_C: {
    type: String,
    required: true,
  },
  choice_D: {
    type: String,
    required: true,
  }
});
const Question = mongoose.model("Question", UserSchema);
module.exports = Question;