const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  return res.render("home");
});

module.exports = router;
