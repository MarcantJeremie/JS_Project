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
        xp: {
            type: Number,
            required: true,
            default: 0
        },
        account_created_on: {
            type: Date,
            required: true,
            default: Date.now
        },
        last_connected_on: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('users', userSchema);