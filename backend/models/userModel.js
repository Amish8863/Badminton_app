const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'referee', 'captain', 'player'],
        default: 'player',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);