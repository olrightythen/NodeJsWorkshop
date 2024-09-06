require("dotenv").config();
const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

// app.use(express.json()); --> This is for parsing JSON data from the frontend
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
require("./models/index");
app.use(express.urlencoded({ extended: true }));

app.use("/", blogRoutes);
app.use("/", authRoutes);

app.get("/about", (req, res) => {
  res.render("layout", { title: "About", body: "about" });
});

app.get("/contact", (req, res) => {
  res.render("layout", { title: "Contact", body: "contact" });
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send(
    "<h1>Thanks for submitting the form!</h1><a href='/'>Go back to the homepage</a>"
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
