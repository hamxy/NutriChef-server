const Recipe = require("../models/Recipe");

/**
 * recipe GET route handles recipe retrieving from the db
 *
 *
 */

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
 *
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
