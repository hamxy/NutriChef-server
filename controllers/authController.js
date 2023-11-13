const User = require("../models/User")

// handle errors 
// https://www.toptal.com/nodejs/node-js-error-handling


const handleErrors = (err) => {
    console.log(err.message);
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    }
    catch (err) {
        handleErrors(err);
        res.status(400).send(err.errors.password);
    }
}

module.exports.login_post = (req, res) => {
    console.log(req.body);
    res.send('new login');
}

// fuel wednesday:26L, 8400 isk, 40 km + check phone