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

module.exports = router;
