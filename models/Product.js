const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name."]
    },
    kcal: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    gramInTableSpoon: Number,
    gramInTeaSpoon: Number,
    gramInItem: Number
})

module.exports = model("Product", productSchema)

/**
 * name *
 * kcal *
 * carbs *
 * protein *
 * fat *
 * gramInTableSpoon
 * gramInTeaSpoon
 * gramInItem
 */