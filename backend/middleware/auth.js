const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID and attach to request (excluding password)
        req.user = await User.findById(decoded.user.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ msg: 'Authorization denied, user not found' });
        }
        
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;
