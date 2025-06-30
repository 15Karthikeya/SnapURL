// backend/controllers/urlController.js

const Url = require("../models/Url"); // Import the Url model (MongoDB)
const { nanoid } = require("nanoid"); // Import nanoid to create short unique IDs
const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body; // Get the long URL sent by user
  const shortId = nanoid(7); // Generate a random 7-character ID (e.g., "aB91LcQ")
  try {
    const newUrl = await Url.create({
      originalUrl, // Store original long URL
      shortId, // Store generated ID
      createdBy: req.user.id, // Store logged-in user's ID (from middleware)
    });
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`, // Send back the full short URL
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
};
const redirectToOriginal = async (req, res) => {
  try {
    const { shortId } = req.params; // Get ID from the URL like /aB91LcQ
    const url = await Url.findOne({ shortId }); // Look up the original URL
    if (!url) return res.status(404).json({ message: "URL not found" });

    url.visitCount++; // Increment the visit count
    await url.save(); // Save the updated count

    res.redirect(url.originalUrl); // Redirect to original long URL
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(urls); // Send all URLs of that user (latest first)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  
module.exports = { shortenUrl, redirectToOriginal, getUserUrls };
