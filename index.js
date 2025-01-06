const express = require("express");
const path = require("path");

const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");

const { connectToMongoDB } = require("./connect");

const SERVER = express();
const PORT = 8001;

// Middleware to parse JSON requests
SERVER.use(express.json());
SERVER.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if the database connection fails
  });

SERVER.set("view engine", "ejs");
SERVER.set("views", path.resolve("./views"));
SERVER.use(express.static("./views"));

// Routes for URL shortening
SERVER.use("/url", urlRoute.router);
// Route for redirecting using shortID
SERVER.get("/url/:shortID", urlRoute.router);
//SSR?
SERVER.use("/", staticRoute);

// Start the server
SERVER.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
