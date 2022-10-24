var mongoose = require("mongoose");
var IndividualTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  }
});
var IndividualTrainee = mongoose.model("Individual Trainees", IndividualTraineeSchema);
module.exports = IndividualTrainee;