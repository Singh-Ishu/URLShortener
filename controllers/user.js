const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered." });
    }

    await User.create({ name, email, password });
    return res.redirect("/");
  } catch (error) {
    console.error("Signup Error:", error);
    return res.render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log("Login Attempt:", { email, password });
    console.log("User Found:", user);

    if (!user) {
      console.log("User not found!");
      return res.render("login", { error: "Invalid Username or Password." });
    }

    if (user.password !== password) {
      console.log("Password mismatch!");
      return res.render("login", { error: "Invalid Username or Password." });
    }

    console.log("Login successful!");
    return res.redirect("/");
  } catch (error) {
    console.error("Login Error:", error);
    return res.render("login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
