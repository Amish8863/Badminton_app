const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signup controller
const signupController = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        //checking user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'player' // default role is player
        })

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error in signupController: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Login controller
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        //checking user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        //checking password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        //generating JWT token
        // const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        //generating access token
        const accessToken = jwt.sign({ id: existingUser._id, name: existingUser.name, role: existingUser.role }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

        //generating refresh token
        const refreshToken = jwt.sign({ id: existingUser._id, name: existingUser.name, role: existingUser.role }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

        //saving refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV = "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        
        //sending response
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            accessToken: accessToken
        })

    } catch (error) {
        console.error('Error in loginController: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Middleware to verify refresh token
const verifyToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({
            id: user.id,
            role: user.role
        },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ASSESS_TOKEN_EXPIRY }
        );

        res.status(200).json({ accessToken: newAccessToken });
    })
}

// logout token
const logoutController = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV = "production",
        sameSite: 'Strict'
    })

    res.status(200).json({ message: 'Logout successful' });
}

// Exporting controllers
module.exports = {
    signupController,
    loginController,
    verifyToken,
    logoutController
}