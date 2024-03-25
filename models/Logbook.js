const { Schema, model } = require("mongoose");

const logbookSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  breakfast: {
    type: [
      {
        product: String,
        quantity: Number,
      },
    ],
  },
  lunch: {
    type: [
      {
        product: String,
        quantity: Number,
      },
    ],
  },
  dinner: {
    type: [
      {
        product: String,
        quantity: Number,
      },
    ],
  },
});

const Logbook = model("logbook", logbookSchema);
module.exports = Logbook;

//TODO: create schema to avoid
// type: [{
//         product: String,
//         quantity: Number
//         }]
