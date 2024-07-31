const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Provide user id"],
  },
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    required: false,
    maxLength: 1000,
  },
  steps: {
    type: [String],
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  preparationTime: {
    type: Number,
    required: true,
  },
  totalCalories: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCarbs: {
    type: Number,
    required: true,
    default: 0,
  },
  totalProtein: {
    type: Number,
    required: true,
    default: 0,
  },
  totalFat: {
    type: Number,
    required: true,
    default: 0,
  },
});

/**
 * Hook for calculating total kcal, carbs, etc. in products.
 * It uses .reduce() function to add value from each product.
 * All nutritional data in Product is per 100g,
 * so formula is kcal * quantity / 100
 *
 * For example:
 * let products = [
 *  {
 *    product: 'tomato',
 *    quantity: 300,
 *  },
 *  {
 *    product: 'chicken',
 *    quantity: 150,
 *  },
 * ]
 *
 * tomato has 19 kcal in 100g
 * chicken has 165 kcal in 100g
 *
 * kcal * quantity / 100
 * 19 * 300 / 100 = 57 kcal (total tomatoes)
 * 165 * 150 / 100 = 247.5 kcal (total chicken)
 * = 304.5 kcal
 */
recipeSchema.pre("save", async (next) => {
  this.totalCalories = this.products.reduce(
    (acc, current) => acc + (current.product.kcal * current.quantity) / 100,
    0
  );
  this.totalCarbs = this.products.reduce(
    (acc, current) => acc + (current.product.carbs * current.quantity) / 100,
    0
  );
  this.totalProtein = this.products.reduce(
    (acc, current) => acc + (current.product.protein * current.quantity) / 100,
    0
  );
  this.totalFat = this.products.reduce(
    (acc, current) => acc + (current.product.fat * current.quantity) / 100,
    0
  );
  next();
});

// fire a function after doc saved to db
recipeSchema.post("save", function (doc, next) {
  console.log("New recipe was created and saved.", doc);
  next();
});

const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
