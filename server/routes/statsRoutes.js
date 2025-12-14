const express = require("express");
const Issue = require("../models/Issue");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });
    const activeCitizens = await User.countDocuments({ role: "citizen" });

    res.json({
      totalIssues,
      resolvedIssues,
      activeCitizens,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
