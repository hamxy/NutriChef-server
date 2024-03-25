const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    createdBy: {
        type: String,
        required: [true, "Provide user id"]
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: false,
        maxLength: 500
    },
    steps: {
        type: [String],
        required: true,
    },
    products: {
        type: [{
            product: String,
            quantity: Number
        }],
        required: true
    }
})

const Recipe = model('recipe', recipeSchema);
module.exports = Recipe;