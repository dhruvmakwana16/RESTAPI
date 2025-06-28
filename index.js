// index.js
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: 1,
    username: "apnacollege",
    content: "I love coding!",
  },
  {
    id: 2,
    username: "shradhakhapra",
    content: "Hard work is important to achieve success",
  },
  {
    id: 3,
    username: "rahulkumar",
    content: "I got selected for my 1st internship!",
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = Date.now();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (!post) return res.send("Post not found");
  res.render("show", { post });
});
// Edit form
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (!post) return res.send("Post not found");
  res.render("edit", { post });
});


app.post("/posts/:id/delete", (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => p.id != id);
  res.redirect("/posts");
});

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("listening on port 8080");
});