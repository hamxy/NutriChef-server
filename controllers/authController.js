const User = require("../models/User");
const authErrors = require("../errors/authErrors");

// handle errors
// https://www.toptal.com/nodejs/node-js-error-handling

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * signup POST route handle user registering
 */
module.exports.signup_post = async (req, res) => {
    // take email & password from the request body
    const { email, password } = req.body;
    
    // try to create a new user and save it into a database
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } 
    catch (err) {
        console.log(err);
        const errors = authErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = (req, res) => {
    console.log(req.body);
    res.send('new login');
}

// iceland: fuel wednesday: 26L (£1.9/L), 8400 isk, 40 km + check phone