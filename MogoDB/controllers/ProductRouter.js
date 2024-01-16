const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// let products = [];

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("product/list", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/add-product", async (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  if (isNaN(price)) {
    res.status(400);
    next(new Error("Lỗi dữ liệu"));
  } else {
    try {
      await product.save();
      res.redirect("/product");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});

productRouter.get("/search", async (req, res, next) => {
  const productName = req.query.productName;
  try {
    const filteredProducts = await Product.find({
      name: { $regex: new RegExp(productName, "i") },
    });
    if (filteredProducts.length == 0) {
      res.status(404);
      next();
    } else {
      res.render("product/search-results", {
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
      res.render("product/product-details", { product });
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    res.status(400);
    next(new Error("Lỗi sai ID"));
  }
});

productRouter.post("/delete", async (req, res, next) => {
  const productId = req.body.idProduct;
  try {
    const product = await Product.findById(productId);
    if (product) {
      await product.deleteOne();
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
