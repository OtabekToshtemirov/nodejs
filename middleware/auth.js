const jwt = require('jsonwebtoken');
const config = require('config');



function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch (err) {
        console.error('Invalid token.');
        res.status(400).json({ status: 'error', message: 'Invalid token.' });
    }
}

module.exports = auth;