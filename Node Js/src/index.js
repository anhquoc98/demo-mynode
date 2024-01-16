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

app.post("/sendMail", async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ruyanoriconer@gmail.com",
      pass: "Anhquoc12",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: "ruyanoriconer@gmail.com", // sender address
      to: "anhquoc98dn@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    },
    (err) => {
      if (err) {
        return res.json({
          message: "lỗi",
          err,
        });
      }
      return res.json({
        message: "Đã gởi thành công",
      });
    }
  );
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRoutes);
// app.use("/public", express.static("public"));
// app.use("/s", webRoutes);

~app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
