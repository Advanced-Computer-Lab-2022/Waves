const mongoose = require("mongoose");
const IndividualTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: email,
    required: true,
  },
  password: {
    type: password,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  }
});
const IndividualTrainee = mongoose.model("IndividualTrainee", UserSchema);
module.exports = IndividualTrainee;