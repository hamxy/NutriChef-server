const Product = require("../models/Product");

/**
 * Product GET route handles product retrieving from the db
 *
 *
 */

module.exports.getProductKeyword = async (req, res) => {
  const { keyword } = req.body;

  try {
    const products = await Product.find({
      name: { $regex: `.*${keyword}.*`, $options: "i" },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to search products", error });
  }
};

/**
 * Product POST route handles creating a new product and saving it into the db
 *
 */

module.exports.createProduct = async (req, res) => {
  const {
    title,
    kcal,
    carbs,
    protein,
    fat,
    gramInTableSpoon,
    gramInTeaSpoon,
    gramInItem,
  } = req.body;

  try {
    const product = await Product.create({
      title: title,
      kcal: kcal,
      carbs: carbs,
      protein: protein,
      fat: fat,
      gramInTableSpoon: gramInTableSpoon,
      gramInTeaSpoon: gramInTeaSpoon,
      gramInItem: gramInItem,
    });

    res.status(201).send(`Product ${product.title} was created`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
