const { users } = require("../models/index");
const bcrypt = require("bcrypt");

// Render the registration form
exports.renderRegister = (req, res) => {
  res.render("layout", { title: "Register", body: "register" });
};

// Register a new user with secure password hashing using bcrypt
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await users.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.redirect("/login");
    } else {
      res.status(400).json({ error: "User registration failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Render the login form
exports.renderLogin = (req, res) => {
  res.render("layout", { title: "Login", body: "login" });
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.redirect("/");
    } else {
      res.status(401).json({ error: "Invalid login" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
