const mongoose = require("mongoose");
const AccessSchema = new mongoose.Schema({
  username: String,
  courseTitle: String,
});
const AccessRequest = mongoose.model("AccessRequest", AccessSchema);
module.exports = AccessRequest;
