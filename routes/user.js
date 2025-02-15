const express = require("express");
const router = express.Router();

const { handleUserSignup, handleUserLogin } = require("../controllers/user");

router.post("/", handleUserSignup);
router.post("/login", handleUserSignup);

module.exports = { router };
