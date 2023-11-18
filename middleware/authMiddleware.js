const jwt = require('jsonwebtoken');


/**
 * Method that prevents unauthorised users to access restricted routes
 * Check if cookie contains jwt token
 * Check if jwt token is legitimate (with secret password)
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            console.log(decoded.id);
            console.log(err);
            req.id = decoded.id
        });
    }

    next();
}

module.exports = authMiddleware;