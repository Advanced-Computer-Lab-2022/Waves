var mongoose = require("mongoose");
var CorporateTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  inbox: {
    type: Array,
    require: false,
  },
  token: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  courses: [
    {
      courseTitle: String,
      chapters: [{ done: Boolean, sectionName: String }],
      progress: Number,
      certificateSent: { type: Boolean, default: false },
    },
  ],
  country: {
    type: String,
  },
  bio: {
    type: String,
  },
  wallet: {
    type: Number,
  },
});

function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
    ? mongoose.model(modelName) // If true, only retrieve it
    : mongoose.model(modelName, modelSchema); // If false, define it
}
var CorporateTrainee = loadModel("Corporate Trainees", CorporateTraineeSchema);
module.exports = CorporateTrainee;
