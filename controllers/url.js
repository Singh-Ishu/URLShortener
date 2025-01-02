const shortid = require("shortid");
const URL = require("../models/url");

/**
 * Handles the generation of a new short URL.
 * Validates input, generates a unique short ID, and stores it in the database.
 */
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  // Validate that a URL is provided
  if (!body.url) {
    return res.status(400).json({ error: "URL is required." });
  }

  const existingURL = await URL.findOne({ redirectURL: body.url });
  if (existingURL) {
    return res
      .status(200)
      .json({ message: "ID already in database", id: existingURL.shortID });
  }

  try {
    const shortID = shortid.generate();

    await URL.create({
      shortID: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.status(201).render("home", { id: shortID });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles incoming short URLs by redirecting to the original URL.
 * Updates the visit history with the current timestamp.
 */
async function handleIncomingShortURL(req, res) {
  const shortID = req.params.shortID;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleIncomingShortURL,
};
