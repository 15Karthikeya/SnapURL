// backend/routes/urlRoutes.js

const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  redirectToOriginal,
  getUserUrls,
} = require("../controllers/urlController");

const { protect } = require("../middleware/authMiddleware");
router.post("/shorten", protect, shortenUrl);
router.get("/user", protect, getUserUrls);
router.get("/:shortId", redirectToOriginal);
module.exports = router;
