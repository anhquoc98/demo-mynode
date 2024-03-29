const express = require("express");
const {
  getHomepage,
  join,
  insertData,
  updateData,
  getById,
  insertDataUser,
  deleteById,
  getByName,
} = require("../controller/homeController");
const sendGmail = require("../controller/sendEmail");
const router = express.Router();

// Khai báo routes
router.get("/product", getHomepage);
router.get("/product/:id", getById);
router.get("/join", join);
router.post("/create", insertData);
router.post("/update/:id", updateData);
router.post("/users", insertDataUser);
router.delete("/delete/:id", deleteById);

router.get("/name/:name", getByName);

module.exports = router;
