const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movies");

const app = express();

mongoose
  .connect("mongodb+srv://mggmanik:EBZWG86kwjyVAI2a@cluster0-seypl.mongodb.net/node-angular?retryWrites=true", {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/movie", movieRoutes);

module.exports = app;
