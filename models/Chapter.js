var mongoose = require("mongoose");
const ChapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    exercise: {
        type: Object,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});
const Chapter = mongoose.model("Chapter", ChapterSchema);
module.exports = Chapter;