var mongoose = require("mongoose");
var QuestionSchema = new mongoose.Schema({
  belongsToExercise: {
    type: String,
    required: true,
  },
  q1: {
    type: String,
    required: true,
  },
  q2: {
    type: String,
    required: true,
  },
  q3: {
    type: String,
    required: true,
  },
  q4: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  }
});
var Question = mongoose.model("Question", QuestionSchema);
module.exports = Exercise;