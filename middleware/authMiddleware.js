const jwt = require('jsonwebtoken');
const User = require("../models/User");

// TODO: throw custom Errors: AuthError

/**
 * Method that prevents unauthorised users to access restricted routes
 * Try to verify token
 * Find the user in db and add it to res.locals.user
 * Catch JsonWebTokenError
 *  if token is not provided (does not exist in req.cookies.jwt)
 *  if signature is invalid
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
module.exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = await User.findById(decoded.id);
        next();
    } 
    catch (err) {
        next(err);
        res.status(401).json({ "error": err.message });
    }
}

module.exports.checkUser
