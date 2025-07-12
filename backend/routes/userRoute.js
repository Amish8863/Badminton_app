const express = require('express');
const Users = require('../models/userModel');
const { signupController, loginController, verifyToken, logoutController } = require('../controllers/authController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

// middleware to generate access token
router.post('/refresh', verifyToken)

// Route for user signup
router.post('/signup', signupController);

// Route for user login
router.post('/login', loginController);

// Route for remove token
router.post('/logout', logoutController);

//getting all users
router.get('/', verifyAccessToken, authorizeRole('admin'), async (req, res) => {
    const users = await Users.find().select('-password');
    res.status(200).json(users);
})

// delete a user
router.delete('/:id', verifyAccessToken, authorizeRole('admin'), async (req, res) => {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
})

// Exporting the router
module.exports = router;