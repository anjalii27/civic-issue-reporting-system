// server/routes/adminRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// -------------------------------------------
// CREATE OFFICER  (ADMIN ONLY)
// -------------------------------------------
router.post("/create-officer", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const officer = await User.create({
      name,
      email,
      password: hashed,
      role: "officer",
    });

    res.json({ message: "Officer created successfully", officer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------------------
// OPTIONAL: CREATE ADMIN (ADMIN ONLY)
// -------------------------------------------
router.post("/create-admin", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "admin",
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET ALL OFFICERS (ADMIN ONLY)
router.get("/officers", protect, adminOnly, async (req, res) => {
  try {
    const officers = await User.find({ role: "officer" }).select("-password");
    res.json({ officers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
