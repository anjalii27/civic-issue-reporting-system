const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ---------------------
// Protect (Login Required)
// ---------------------
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ---------------------
// Admin Only
// ---------------------
const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admins only" });
};

// ---------------------
// Officer OR Admin
// ---------------------
const officerOrAdmin = (req, res, next) => {
  if (req.user?.role === "officer" || req.user?.role === "admin") return next();
  return res.status(403).json({ message: "No permission for this action" });
};

module.exports = { protect, adminOnly, officerOrAdmin };
