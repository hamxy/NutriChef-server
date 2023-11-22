const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

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

// GET logout
router.get('/logout', authController.logout_get);


// cookies
// for tests
router.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    res.send(cookies);
})

// restricted route
// for tests
router.get('/user', requireAuth, (req, res) => {
    res.status(200).json({ "user": res.locals.user.email });
})

module.exports = router;
