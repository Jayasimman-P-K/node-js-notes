const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("content-type", "text/html");

  // routing
  let path = "./public/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about"); // redirects
      res.end();
      break;
    default:
      path += "error.html";
      res.statusCode = 404;
      break;
  }

  // send an response
  fs.readFile(path, (err, data) => {
    err
      ? (console.log(err),
        // end the response
        res.end())
      : (res.write(data),
        // end the response
        res.end());
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
