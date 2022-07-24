const express = require("express");
const genre = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const mongoose = require("mongoose");

/*
 * Setup mongoose before anything 
 */
mongoose
  .connect("mongodb://localhost/genres")
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((e) => {
    console.log(e);
  });

var app = express();
app.use(express.json());
app.use("/genres", genre);
app.use("/customers", customers);
app.use("/movies", movies);

app.listen(3000, () => console.log("Listening at port 3000..."));
