const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access Denied' });
        }
        next();
    }
}

module.exports = authorizeRole;