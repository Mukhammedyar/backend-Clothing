const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRouter = require("./routes/category.router");
const productRouter = require("./routes/product.router");
const outerWearRouter = require("./routes/outerwear.router");
const fileUpload = require('express-fileupload');
const shoesRouter = require("./routes/shoes.router");
const mainRouter =  require("./routes/main.router")
// config dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.URL;

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({}))

// routes
app.use("/api/categories/", categoryRouter);
app.use("/api/underwear/", productRouter);
app.use("/api/outerwear/", outerWearRouter);
app.use("/api/shoes/", shoesRouter);
app.use("/", mainRouter);

// mogo db connection
const connectDataBase = async () => {
  try {
    await mongoose
      .connect(DB_URL, {})
      .then(() => console.log("connected to database: " + DB_URL));
    app.listen(PORT, () => {
      console.log("listening on port: hhtp://localhost:" + PORT);
    });
  } catch (error) {
    console.log(`error connecting to DataBase: ${error}`);
  }
};

connectDataBase();
