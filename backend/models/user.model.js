const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        login:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model('users', userSchema);