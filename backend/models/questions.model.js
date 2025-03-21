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
    },
    created_by: {
        type: String,
        required: true
    },
    verified_by: {
        type: String,
        required: false
    },
    created_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    verified_on: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("questions", questionsSchema);