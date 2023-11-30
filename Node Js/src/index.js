const express = require("express");
const app = express();
const port = 8080;

// config template engine
app.set("views", "./src/views/");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

~app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
