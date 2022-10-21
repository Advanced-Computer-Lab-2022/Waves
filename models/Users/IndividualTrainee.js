const mongoose = require("mongoose");
const IndividualTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
const IndividualTrainee = mongoose.model("IndividualTrainee", UserSchema);
module.exports = IndividualTrainee;