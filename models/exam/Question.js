let mongoose = require("mongoose");
let QuestionSchema = new mongoose.Schema({
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
let Question = mongoose.model("Question", QuestionSchema);
module.exports = Exercise;