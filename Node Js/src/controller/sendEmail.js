const nodemailer = require("nodemailer");

const sendGmail = async (email) => {
  console.log("=>>>>", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ruyanoriconer@gmail.com",
      pass: "xdsx givq cbek meri",
    },
  });

  try {
    await transporter.sendMail({
      from: "Chào mừng đến với C0323G1 ruyanoriconer@gmail.com",
      to: `${email}`,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
    return res.json({
      message: "đã gởi email tới tài khoản ",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendGmail;
