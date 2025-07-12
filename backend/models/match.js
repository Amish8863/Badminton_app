const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ['solo', 'team'],
        required: true,
        default: 'solo'
    },

    matchDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    status: {
        type: String,
        enum: ['inprogress', 'completed'],
        default: 'inprogress',
        required: true
    },

    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],

    roundScores: [
        {
            round: Number,
            totalPoints: Number,
            player1Score: Number,
            player2Score: Number,
        }
    ],

    isDraw: {
        type: Boolean,
        default: false
    },

    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    // Team Match Fields
    captainA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.mode === 'team';
        }
    },
    captainB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.mode === 'team';
        }
    },

    teamAPlayers: [String],
    teamBPlayers: [String],
    teamAScore: Number,
    teamBScore: Number,
    winnerCaptain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;