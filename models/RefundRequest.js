const mongoose = require("mongoose");
const RefundSchema = new mongoose.Schema({
    username: String,
    courseTitle: String,
    userProfilePic: String,

});
const RefundRequest = mongoose.model("RefundRequest", RefundSchema);
module.exports = RefundRequest;