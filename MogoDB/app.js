const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const productRouter = require("./controllers/ProductRouter");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/demo")
  .then((data) => {
    console.log("connect thành công");
  })
  .catch((e) => {
    console.log("Lỗi");
  });

app.use("/product", productRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).render("404");
  next();
});

// Middleware xử lý lỗi 400
app.use((err, req, res, next) => {
  if (res.statusCode == 400) {
    res.status(400).render("400");
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
