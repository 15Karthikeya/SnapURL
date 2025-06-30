// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// MongoDB + Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error(err));
