const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product title not provided."],
  },
  kcal: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  gramInTableSpoon: Number,
  gramInTeaSpoon: Number,
  gramInItem: Number,
});

// Create a text index on the name field
productSchema.index({ name: "text" });

module.exports = model("Product", productSchema);

/**
 * title *
 * kcal *
 * carbs *
 * protein *
 * fat *
 * gramInTableSpoon
 * gramInTeaSpoon
 * gramInItem
 */
