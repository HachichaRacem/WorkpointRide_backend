const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ errors: [{ msg: 'Authorization token is required' }] });
        }

        const decoded = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Log decoded token for debugging

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(400).send({ errors: [{ msg: 'Unauthorized1' }] });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Token verification error:', error); // Log token verification error
        return res.status(500).send({ errors: [{ msg: 'Unauthorized2' }] });
    }
};

const restrict = (role) => {
    return async (req, res, next) => {
        try {
            if (req.user.role !== role) {
                return res.status(403).send({ errors: [{ msg: 'You are not authorized to do this action' }] });
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).send({ errors: [{ msg: 'Unauthorized3' }] });
        }
    };
};

module.exports = { authMiddleware, restrict };
