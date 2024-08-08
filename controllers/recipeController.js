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
