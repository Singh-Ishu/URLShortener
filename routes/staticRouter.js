const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
