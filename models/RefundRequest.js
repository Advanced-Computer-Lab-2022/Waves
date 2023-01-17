const mongoose = require("mongoose");
const RefundSchema = new mongoose.Schema({
    username: String,
    courseTitle: String,
    courseImg: String,

});
const RefundRequest = mongoose.model("RefundRequest", RefundSchema);
module.exports = RefundRequest;