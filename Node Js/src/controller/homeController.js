const connection = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";
const sendGmail = require("../controller/sendEmail");

const insertDataUser = async (req, res) => {
  const { email, password } = req.body;
  let bcryptPass = "";
  bcrypt.hash(`${password}`, saltRounds, async function (err, hash) {
    console.log("=>>>", hash);
    bcryptPass = hash;
    try {
      const query = `INSERT INTO users (user_name,password) VALUES ("${email}", "${bcryptPass}")`;

      const results = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      console.log(results);
      await sendGmail(email);
      res.send("Data inserted successfully");
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
    }
  });
};

const getHomepage = (req, res) => {
  let users = [];
  connection.query("SELECT * FROM product", function (err, result, fields) {
    console.log("abc", result);
    users = result;
    res.send(JSON.stringify(users));
  });
};

const join = (req, res) => {
  let users = [];
  connection.query(
    "SELECT *, type_product.name FROM product join type_product on type_product.id_type = product.type_product_id_type",
    function (err, result, fields) {
      users = result;
      res.send(JSON.stringify(users));
    }
  );
};

const insertData = async (req, res) => {
  try {
    const { name, price, title, type_product_id_type } = req.body;

    const query =
      "INSERT INTO product (name, price, title, type_product_id_type) VALUES (?, ?, ?, ?)";

    const results = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [name, price, title, type_product_id_type],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log(results);
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
};

const updateData = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy id sản phẩm từ URL
    const { name, price, title, type_product_id_type } = req.body;

    const query =
      "UPDATE product SET name=?, price=?, title=?, type_product_id_type=? WHERE id=?";

    const results = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [name, price, title, type_product_id_type, productId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log(results);
    res.send("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Error updating data");
  }
};

const getById = (req, res) => {
  const productId = req.params.id;

  connection.query(
    "SELECT * FROM product WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.send(results[0]);
      } else {
        res.send("Not found");
      }
    }
  );
};

module.exports = {
  getById,
  getHomepage,
  join,
  insertData,
  updateData,
  insertDataUser,
};
