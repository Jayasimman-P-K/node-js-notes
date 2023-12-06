const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

// initiate express app
const app = express();

// connect with mongoDB
const dbURI =
  "mongodb+srv://jc:123test@blog-app.wnpboyg.mongodb.net/?retryWrites=true&w=majority";
// listen for requests
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

// get responses
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
