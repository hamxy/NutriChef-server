const Recipe = require("../models/Recipe");

/**
 * recipe GET route handles recipe retrieving from the db
 *
 *
 */

module.exports.recipe_get = async (req, res) => {
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
  console.log(createdBy);

  try {
    const recipe = await Recipe.create({
      createdBy: createdBy,
      title: title,
      description: description,
      course: course,
      steps: steps,
      products: products,
      preparationTime: preparationTime,
      cookingTime: cookingTime,
    });

    res.status(201).send(`Recipe ${recipe.title} was created`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
