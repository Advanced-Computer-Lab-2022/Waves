const mongoose = require("mongoose");
const AccessSchema = new mongoose.Schema({
  username: String,
  courseTitle: String,
  courseImg: String,
});
const AccessRequest = mongoose.model("AccessRequest", AccessSchema);
module.exports = AccessRequest;
