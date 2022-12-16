const mongoose = require("mongoose");
const GuestSchema = new mongoose.Schema({
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
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type:String
  },
  bio:{
    type: String
  }
});
const Guest = mongoose.model("Guest", GuestSchema);
module.exports = Guest;




