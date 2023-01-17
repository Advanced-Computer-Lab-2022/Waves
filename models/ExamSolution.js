var mongoose = require("mongoose");
var ExamSolutionSchema = new mongoose.Schema({
      s1: {
        type: String,
        required: true,
      },
      s2: {
        type: String,
        required: true,
      },
      s3: {
        type: String,
        required: true,
      },
      s4: {
        type: String,
        required: true,
      }
  });
  var ExamSolution = mongoose.model("ExamSolution", ExamSolutionSchema);
  module.exports = ExamSolution;