const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");
const multer = require("multer");

/**
 * User routes - protected
 *
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Adjust the upload directory as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// ROUTES

/**
 * GET /profile
 */
router.get("/", requireAuth, userController.user_get);

/**
 * PUT /profile
 */
router.put("/", requireAuth, userController.user_put);

/**
 * POST /profile/upload-photo
 */

router.post(
  "/upload-photo",
  requireAuth,
  upload.single("profilePhoto"),
  userController.upload_photo
);

module.exports = router;
