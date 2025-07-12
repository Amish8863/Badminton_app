const Match = require('../models/match');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Create a new match
const createMatch = async (req, res) => {

    try {
        const { mode } = req.body;

        // 🟦 TEAM MATCH LOGIC
        if (mode === 'team') {
            const {
                captainA,
                captainB,
                teamAPlayers,
                teamBPlayers,
                teamAScore,
                teamBScore,
                matchDate
            } = req.body;

            if (!captainA || !captainB || !teamAPlayers || !teamBPlayers) {
                return res.status(400).json({ message: 'Missing team match data' });
            }

            const winnerCaptain =
                teamAScore > teamBScore ? captainA :
                    teamBScore > teamAScore ? captainB :
                        null;

            const match = await Match.create({
                mode: 'team',
                captainA,
                captainB,
                teamAPlayers,
                teamBPlayers,
                teamAScore,
                teamBScore,
                winnerCaptain,
                matchDate,
                status: 'completed',
                createdBy: req.user._id
            });

            return res.status(201).json({ message: 'Team match created successfully', match });
        }

        // 🟦 SOLO MATCH LOGIC
        if (mode === 'solo') {

            const { players, roundScores, matchDate } = req.body;

            if (!players || players.length !== 2) {
                return res.status(400).json({ error: 'Two players are required to create a match.' });
            }

            if (!matchDate || !roundScores || roundScores.length === 0) {
                return res.status(400).json({ error: 'Match date and atleast 1 round are required.' });
            }

            // winner calculation
            let p1win = 0;
            let p2win = 0;
            let status = 'inprogress';

            roundScores?.forEach(round => {
                const { totalPoints, player1Score, player2Score } = round;
                console.info(player1Score, player2Score);

                if (player1Score === totalPoints) {
                    p1win++;
                    status = 'completed';
                } else if (player2Score === totalPoints) {
                    p2win++;
                    status = 'completed';
                }
            });

            console.info(p1win, p2win);

            let winner = null;
            let isDraw = false;

            if (p1win > p2win) {
                winner = players[0];
            } else if (p2win > p1win) {
                winner = players[1];
            } else {
                isDraw = true;
            }

            const match = await Match.create({
                players,
                roundScores,
                matchDate,
                winner,
                status,
                isDraw,
                createdBy: req?.user?._id
            });

            res.status(201).json({ message: 'Match created Successfully', match });
        }
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get matches of specific user
const getUserMatches = async (req, res) => {
    const userId = req?.params.id;
    // const userId = new mongoose.Types.ObjectId(req.params.id);
    console.log("userId: ", userId)
    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const matches = await Match.find({ mode: 'solo', players: { $in: [userId] } }).populate('players', 'name +email').populate('winner', 'name').sort({ matchDate: -1 });

        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching user matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// get all matches
const getAllMatches = async (req, res) => {
    const { mode } = req.query;
    try {
        const query = {};
        if (mode) {
            query.mode = mode;
        }
        const matches = await Match.find(query).populate('players', 'name email').populate('captainA', 'name').populate('captainB', 'name').populate('winner', 'name').populate('winnerCaptain', 'name').sort({ matchDate: -1 });

        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching all matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// function to get stats for solo
const getSoloStats = async (req, res) => {
    const userId = req?.params.id;

    try {
        const matches = await Match.find({ mode: 'solo', players: { $in: [userId] }, status: 'completed' });

        const totalMatches = matches?.length || 0;
        let wins = 0, losses = 0, draws = 0, scored = 0, conceded = 0;

        matches.forEach(match => {
            const isWinner = match.winner && match.winner.toString() === userId;
            const isDraw = match.isDraw;

            if (!isDraw) {
                if (isWinner) {
                    wins++;
                } else {
                    losses++;
                }
            }

            match.roundScores.forEach(round => {
                const isP1 = match.players[0].toString() === userId;
                if (isP1) {
                    scored += round.player1Score || 0;
                    conceded += round.player2Score || 0;
                } else {
                    scored += round.player2Score || 0;
                    conceded += round.player1Score || 0;
                }
            })
        });

        const winPercentage = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(2) : 0;

        res.json({
            totalMatches,
            wins,
            losses,
            draws,
            scored,
            conceded,
            winPercentage,
        })

    } catch (error) {
        console.error('Error fetching solo stats:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

const getTeamStats = async (req, res) => {
    const userId = req.params?.id;

    console.log("userId: ", userId);

    try {
        // 🔹 Step 1: Get user name (teamAPlayers/teamBPlayers me string name stored hota hai)
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const userName = user.name;

        // 🔹 Step 2: Get matches where user is captainA or captainB
        const captainMatches = await Match.find({
            mode: 'team',
            status: 'completed',
            $or: [{ captainA: userId }, { captainB: userId }]
        });

        let captainWins = 0;
        captainMatches.forEach(match => {
            if (match.winnerCaptain?.toString() === userId) {
                captainWins++;
            }
        });

        const captainStats = {
            matchesLed: captainMatches?.length,
            wins: captainWins,
            losses: captainMatches?.length - captainWins,
            winPercentage: captainMatches?.length
                ? ((captainWins / captainMatches?.length) * 100).toFixed(2)
                : '0.00',
        };

        // 🔹 Step 3: Get matches where user is in teamAPlayers or teamBPlayers
        const teamMemberMatches = await Match.find({
            mode: 'team',
            status: 'completed',
            $or: [
                { teamAPlayers: { $in: [userName] } },
                { teamBPlayers: { $in: [userName] } }
            ]
        });

        const participantStats = {
            matchesParticipated: teamMemberMatches?.length
        };

        res.status(200).json({
            captainStats,
            participantStats
        });

    } catch (error) {
        console.error('Error fetching team stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSoloLeaderboard = async (req, res) => {
    try {
        const matches = await Match.find({ mode: 'solo', status: 'completed' })
            .populate('players', 'name')
            .populate('winner', 'name');

        const stats = {}; // userId → { name, wins, totalMatches }

        matches.forEach(match => {
            match.players.forEach(player => {
                const id = player._id.toString();

                if (!stats[id]) {
                    stats[id] = {
                        name: player.name,
                        wins: 0,
                        totalMatches: 0
                    };
                }

                stats[id].totalMatches++;

                if (match.winner && match.winner._id.toString() === id) {
                    stats[id].wins++;
                }
            });
        });

        const leaderboard = Object.entries(stats).map(([userId, data]) => ({
            name: data.name,
            totalMatches: data.totalMatches,
            wins: data.wins,
            winPercentage: data.totalMatches
                ? ((data.wins / data.totalMatches) * 100).toFixed(2)
                : '0.00'
        }));

        // Sort by win %, descending
        leaderboard.sort((a, b) => b.winPercentage - a.winPercentage);

        res.json(leaderboard);
    } catch (err) {
        console.error('Error generating leaderboard:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTeamLeaderboard = async (req, res) => {
    try {
        const matches = await Match.find({
            mode: 'team',
            status: 'completed'
        })
            .populate('captainA', 'name')
            .populate('captainB', 'name')
            .populate('winnerCaptain', 'name');

        const stats = {}; // userId -> { name, wins, matchesLed }

        matches.forEach(match => {
            const captains = [match.captainA, match.captainB];

            captains.forEach(captain => {
                const id = captain._id.toString();
                if (!stats[id]) {
                    stats[id] = {
                        name: captain.name,
                        matchesLed: 0,
                        wins: 0
                    };
                }

                stats[id].matchesLed++;

                if (match.winnerCaptain && match.winnerCaptain._id.toString() === id) {
                    stats[id].wins++;
                }
            });
        });

        const leaderboard = Object.values(stats).map(captain => ({
            name: captain.name,
            matchesLed: captain.matchesLed,
            wins: captain.wins,
            winPercentage: captain.matchesLed
                ? ((captain.wins / captain.matchesLed) * 100).toFixed(2)
                : '0.00'
        }));

        leaderboard.sort((a, b) => b.winPercentage - a.winPercentage);

        res.json(leaderboard);
    } catch (err) {
        console.error('Error generating team leaderboard:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createMatch, getUserMatches, getAllMatches, getSoloStats, getTeamStats, getSoloLeaderboard, getTeamLeaderboard };