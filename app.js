require("dotenv").config();
const express = require("express");
const { blogs } = require("./modules/index");
const app = express();
const port = 3000;

// app.use(express.json()); --> This is for parsing JSON data from the frontend
app.set("view engine", "ejs");
app.use(express.static("public"));
require("./modules/index");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = { name: "John", age: 30, city: "New York" };
  res.render("index", { title: "Home", data: data });
});

// app.get("/blogs", (req, res) => {
//   res.render("blogs", { title: "Blogs" });
// });

app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.post("/create", async (req, res) => {
  const { title, subtitle, description } = req.body;
  console.log(req.body);
  await blogs
    .create({
      title: title,
      subtitle: subtitle,
      description: description,
    })
    .then((result) => {
      res.send("Blog created successfully");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
