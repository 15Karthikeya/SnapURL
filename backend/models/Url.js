// backend/models/Url.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
