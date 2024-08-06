require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");

const init = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const products = [
    { name: "tomato", kcal: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
    { name: "potato", kcal: 77, carbs: 17.5, protein: 2, fat: 0.1 },
    { name: "cucumber", kcal: 15, carbs: 3.6, protein: 0.7, fat: 0.1 },
  ];

  await Product.insertMany(products);
  console.log("Products inserted");

  const keyword = "cuc";
  const foundProducts = await Product.find({
    name: { $regex: `.*${keyword}.*`, $options: "i" },
  });
  console.log("Products found:", foundProducts);

  mongoose.connection.close();
};

init().catch((err) => console.error("Error:", err));
