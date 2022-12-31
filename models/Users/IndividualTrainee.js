const mongoose = require("mongoose");
const IndividualTraineeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
    require: false,
  },
  profilePic: {
    type: String,
  },
  courses: [
    {
      courseTitle: String,
      chapters: [{ done: Boolean, sectionName: String }],
      progress: Number,
    },
  ],
  token: {
    type: String,
  },
  country: {
    type: String,
  },
  bio: {
    type: String,
  },
});
const IndividualTrainee = mongoose.model(
  "Individual Trainees",
  IndividualTraineeSchema
);
module.exports = IndividualTrainee;
