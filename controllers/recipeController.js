const Recipe = require("../models/Recipe");

/**
 * Get a single recipe by ID
 */
module.exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).populate([
      {
        path: "createdBy",
        select: "email",
      },
      "products.product",
    ]);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe", error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

module.exports.getRecipes = async (req, res) => {
  const { page = 1, limit = 20, search = "", course } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  if (course) {
    query.course = course;
  }

  try {
    const recipes = await Recipe.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

module.exports.getRecipeKeyword = async (req, res) => {
  const { keyword } = req.body;

  try {
    const recipe = await Recipe.find({
      title: { $regex: `.*${keyword}.*`, $options: "i" },
    }).populate([
      {
        path: "createdBy",
        select: "email",
      },
      "products.product",
    ]);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * recipe POST route handles creating a new recipe and saving it into the db
 */

module.exports.createRecipe = async (req, res) => {
  const {
    title,
    description,
    course,
    steps,
    products,
    preparationTime,
    cookingTime,
  } = req.body;
  const createdBy = req.userId;

  try {
    const recipe = new Recipe({
      createdBy,
      title,
      description,
      course,
      steps: JSON.parse(steps),
      products: JSON.parse(products),
      preparationTime,
      cookingTime,
    });

    if (req.file) {
      recipe.photo = req.file.path; // Save the file path in the recipe document
    }

    await recipe.save();

    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(400).json({ message: "Failed to create recipe", error });
  }
};

module.exports.updateRecipe = async (req, res) => {
  const { id } = req.params;

  // When using `multer`, fields are accessed via req.body, but they come as strings, so they might need to be parsed.
  const {
    title,
    description,
    course,
    steps,
    products,
    preparationTime,
    cookingTime,
  } = req.body;

  const userId = req.userId;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this recipe" });
    }

    // Update the recipe fields
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.course = course || recipe.course;
    recipe.steps = steps ? JSON.parse(steps) : recipe.steps;
    recipe.products = products ? JSON.parse(products) : recipe.products;
    recipe.preparationTime = preparationTime || recipe.preparationTime;
    recipe.cookingTime = cookingTime || recipe.cookingTime;

    if (req.file) {
      recipe.photo = req.file.path; // Update photo if a new file is uploaded
    }

    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    console.error("Error updating recipe", error);
    res.status(500).json({ message: "Failed to update recipe", error });
  }
};

module.exports.deleteRecipe = async (req, res) => {
  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(req.params.id);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user trying to delete the recipe is the one who created it
    if (recipe.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this recipe" });
    }

    // If the user is the creator, proceed with deletion
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
};
