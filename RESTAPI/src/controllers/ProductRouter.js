const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  email: String,
});

const Product = mongoose.model("Product", productSchema);

// let products = [];

productRouter.get("/", async (req, res) => {
  try {
    let page = 0;
    if (req.query.page) {
      page = +req.query.page;
      if (page < 0) page = 0;
    }
    const products = await Product.find()
      .sort({ price: -1 })
      .limit(10)
      .skip(page * 2);

    res.json({ products, page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/", async (req, res, next) => {
  const { name, price, email } = req.body;
  if (!name || !price || !email) {
    res.status(400);
    return next(new Error("Tên và giá sản phẩm là bắt buộc"));
  }
  if (/\d/.test(name)) {
    res.status(400);
    return next(new Error("Tên sản phẩm không được chứa số"));
  }
  // Kiểm tra xem price có phải là một số không
  if (isNaN(price)) {
    res.status(400);
    return next(new Error("Giá sản phẩm không hợp lệ"));
  }
  // Kiểm tra định dạng email
  if (!validator.isEmail(email)) {
    res.status(400);
    return next(new Error("Email không hợp lệ"));
  }

  const product = new Product({ name, price, email });

  try {
    await product.save();
    res.status(201).json("Thêm mới thành công");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.get("/search", async (req, res, next) => {
  const productName = req.query.productName;
  console.log(productName);
  try {
    const filteredProducts = await Product.find({
      name: { $regex: new RegExp(productName, "i") },
    });
    if (filteredProducts.length == 0) {
      res.status(404);
      next();
    } else {
      res.status(200).json({
        products: filteredProducts,
        searchTerm: productName,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    res.status(400);
    next(new Error("Lỗi sai ID"));
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  const productId = req.params.id;
  console.log(req.body);
  try {
    const product = await Product.findById(productId);
    if (product) {
      await product.deleteOne();
      res.status(200).json("Xóa thành công");
      res.redirect("/product");
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    res.status(400);
    next(new Error("Lỗi sai ID"));
  }
});

module.exports = productRouter;
