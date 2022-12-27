var mongoose = require("mongoose");
var ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  video: {
    type:String,
    required: true,
  }
});
var Exercise = mongoose.model("Exam", ExamSchema);
module.exports = Exercise;