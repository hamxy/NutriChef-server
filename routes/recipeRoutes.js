const { Router } = require("express");
const router = Router();
const recipeController = require("../controllers/recipeController");
const { requireAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const Recipe = require("../models/Recipe");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/**
 * Recipe routes 
 * GET recipe - get recipes
 * POST recipe - create a new recipe
 
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */

//  /recipe

router.get("/", requireAuth, recipeController.getRecipes);

router.get("/:id", requireAuth, recipeController.getRecipeById);

// GET recipe keyword
router.get("/keyword", requireAuth, recipeController.getRecipeKeyword);

// POST login
router.post(
  "/create",
  requireAuth,
  upload.single("photo"),
  recipeController.createRecipe
);

router.delete("/:id", requireAuth, recipeController.deleteRecipe);

module.exports = router;
