const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    maxLength: 500,
  },
  steps: {
    type: [String],
    required: true,
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  }],
});

const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
