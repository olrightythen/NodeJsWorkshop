const express = require("express");
const router = express.Router();
const {
  renderRegister,
  register,
  renderLogin,
  login,
} = require("../controllers/authController");

router.route("/register").get(renderRegister).post(register);
router.route("/login").get(renderLogin).post(login);

module.exports = router;
