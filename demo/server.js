const http = require("node:http");
const hostname = "127.0.0.1";
const port = 8080;
const fs = require("fs");
const server = http.createServer((req, res) => {
  const template = fs.readFileSync("./index.html");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(template);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
