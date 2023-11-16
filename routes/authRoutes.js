const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController')

/**
 * Authentication routes 
 * POST signup - creates a new user
 * POST login - login existing user
 * 
 * GET signup and login is not needed, as React.js will have them and it will send POST request to API
 * 
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */


 // POST signup
router.post('/signup', authController.signup_post);

// POST login
router.post('/login', authController.login_post);

// cookies

// for tests
router.get('/set-cookies', (req, res) => {
    // setting cookies withous cookie parser
    // res.setHeader('Set-Cookie', 'newUser=true');

    //setting cookies with cookie parser
    // maxAge: how long cookie will be stored ( in miliseconds)
    // secure: true - cookie will be send only over https
    // httpOnly: true - cannot access cookie through console (document.cookie)
    res.cookie('newUser', false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
    res.send('You got the cookie!');
})

router.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    res.send(cookies);
})

module.exports = router;
