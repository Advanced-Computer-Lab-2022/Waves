var mongoose = require("mongoose");
var ExerciseSchema = new mongoose.Schema({
  belongsToCourse: {
    type: String,
    required: true,
  }
});
var Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;