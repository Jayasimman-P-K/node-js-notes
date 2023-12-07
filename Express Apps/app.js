const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// initiate express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));

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

// testing mongodb and mongoose

// saving data in mongodb atlas
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog: 2",
    snippet: "snippet of my new blog 2",
    body: "Writting body data of my new blog 2",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// getting all data from  database
app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// select data by ID
app.get("/id-blog", (req, res) => {
  Blog.findById("6570cd70719df45a9a0aef1d")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// get responses
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// post data to database
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

// get data using params
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("details", { blog: result, title: "Blog Details" })
    )
    .catch((err) => console.log(err));
});

// delete data from database
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
