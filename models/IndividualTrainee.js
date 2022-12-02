var mongoose = require("mongoose");
var IndividualTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  inbox: {
    type: Array,
    require: false
  },
  token: {
    type: String
  }
});
var IndividualTrainee = mongoose.model("Individual Trainees", IndividualTraineeSchema);
module.exports = IndividualTrainee;