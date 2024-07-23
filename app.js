const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const database = require("./helpers/mongodb");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const recipeRouter = require("./routes/recipeRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

// Routers
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/recipe", recipeRouter);
app.use("/profile", userRouter);

// Loads .env file contents into process.env
dotenv.config();

// Connect to database
database();

module.exports = app;
