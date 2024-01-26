require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

// get the client
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
// database
const connection = require("./config/database");
// config template engine
const nodemailer = require("nodemailer");

const configViewEngine = require("./config/viewEngine");
configViewEngine(app);
//web routes
const webRoutes = require("./routes/web");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRoutes);
// app.use("/public", express.static("public"));
// app.use("/s", webRoutes);

~app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
