const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * User routes
 *
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */

// POST signup
router.get("/", requireAuth, userController.user_get);

module.exports = router;
