const mongoose = require("mongoose");
const IndividualTraineeSchema = new mongoose.Schema({
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
const IndividualTrainee = mongoose.model("IndividualTrainee", IndividualTraineeSchema);
module.exports = IndividualTrainee;