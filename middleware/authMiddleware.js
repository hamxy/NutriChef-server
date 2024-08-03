const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
    if (!token) {
      return res
        .status(401)
        .json({ authenticated: false, error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ authenticated: false, error: "User not found" });
    }

    req.userId = decoded.id; // Attach user ID to the request object
    next();
  } catch (err) {
    return res.status(401).json({ authenticated: false, error: err.message });
  }
};

module.exports.checkUser;
