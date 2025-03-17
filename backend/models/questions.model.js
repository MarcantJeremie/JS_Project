const mongoose = require("mongoose");

const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    img_path: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("questions", questionsSchema);