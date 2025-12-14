const express = require("express");
const Issue = require("../models/Issue");
const { protect, officerOrAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../middleware/upload");

/*
  CREATE ISSUE
  This route allows a logged‑in citizen to submit a new civic issue.
*/
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const issue = await Issue.create({
      title,
      description,
      category,
      locationText: location,
      imageUrl,
      createdBy: req.user._id,
    });

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
  GET ALL ISSUES
  Everyone who is logged in can view all issues.
*/
router.get("/", protect, async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ISSUES ASSIGNED TO LOGGED-IN OFFICER
router.get("/assigned/me", protect, async (req, res) => {
  try {
    const issues = await Issue.find({ assignedTo: req.user._id })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/*
 GET SINGLE ISSUE BY ID
*/
router.get("/:id", protect, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
  ASSIGN ISSUE TO OFFICER  
  Only admin or officer can assign the issue.
*/
router.patch("/assign/:id", protect, officerOrAdmin, async (req, res) => {
  try {
    if (!req.body.assignedTo) {
      return res.status(400).json({ message: "No officer selected" });
    }

    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.assignedTo },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Issue assigned successfully", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/*
  UPDATE STATUS (Pending → Verified → In Progress → Resolved)
  Only officer/admin can update.
*/
router.patch("/status/:id", protect, officerOrAdmin, async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Status updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
