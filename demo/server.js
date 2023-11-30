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

// http.createServer(function (req, res) {
// fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//    res.write(data);
//     return res.end();
//  });
// }).listen(8080);
