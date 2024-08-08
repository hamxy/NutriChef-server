const { Router } = require("express");
const router = Router();
const recipeController = require("../controllers/recipeController");
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * Recipe routes 
 * GET recipe - get recipes
 * POST recipe - create a new recipe
 
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */

//  /recipe

// GET recipe
router.get("/", requireAuth, recipeController.recipe_get);

// POST login
router.post("/create", requireAuth, recipeController.createRecipe);

module.exports = router;
