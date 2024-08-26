const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/pageRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors());

// Routes
app.use("/", router);

// Start the Server
mongoose
  .connect(process.env.MongooseURL)
  .then((data) => {
    app.listen(PORT, () => {
      console.log("Database Connected...");
      console.log(`Server is Running on ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });
