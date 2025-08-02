const express = require('express');
const { createMatch, getAllMatches, getSoloStats, getUserMatches, getTeamStats, getSoloLeaderboard, getTeamLeaderboard, refereeStats, refereeMatches } = require('../controllers/matchController');
const { verifyToken } = require('../controllers/authController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const authorizeRole = require('../middlewares/authorizeRole');
const router = express.Router();

// middleware to generate access token
router.post('/refresh', verifyToken)

// Route to create a new match
router.post('/create', verifyAccessToken, authorizeRole('admin', 'referee'), createMatch);

router.get('/:id', verifyAccessToken, getUserMatches);

router.get('/', verifyAccessToken, authorizeRole('admin', 'referee'), getAllMatches)

router.get('/solo-stats/:id', verifyAccessToken, getSoloStats);

router.get('/team-stats/:id', verifyAccessToken, getTeamStats);

router.get('/leaderboard/solo', verifyAccessToken, getSoloLeaderboard);

router.get('/leaderboard/team', verifyAccessToken, getTeamLeaderboard);

// /api/matches/referee-stats
router.get("/referee-stats", verifyAccessToken, refereeStats);

router.get("/by-referee", verifyAccessToken, refereeMatches);

// Exporting the router
module.exports = router;