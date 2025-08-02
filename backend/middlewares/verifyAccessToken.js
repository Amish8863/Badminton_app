const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader: ", authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    token = authHeader?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        console.log("user: ", user)
        next();
    })
}

module.exports = verifyAccessToken;