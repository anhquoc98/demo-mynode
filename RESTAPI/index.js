const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const productRouter = require("./src/controllers/ProductRouter");
const mongoose = require("mongoose");

const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/nodejs_ihub")
  .then((data) => {
    console.log("connect thành công");
  })
  .catch((e) => {
    console.log("Lỗi");
  });

app.use("/product", productRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json("Không tìm thấy");
  next();
});

// Middleware xử lý lỗi 400
app.use((err, req, res, next) => {
  if (res.statusCode == 400) {
    res.status(400).json("Lỗi dữ liệu");
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
