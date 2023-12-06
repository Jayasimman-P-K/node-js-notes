const express = require("express");

// initiate express app
const app = express();

// listen for requests
app.listen(3000);

// get responses
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});
