const express = require("express");
const Issue = require("../models/Issue");
const { protect, officerOrAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// --------------------------------------------
// CREATE ISSUE + DUPLICATE CHECK
// --------------------------------------------
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Check for duplicate (same category + locationText)
    const existing = await Issue.findOne({
      category,
      locationText: location
    });

    if (existing) {
      existing.duplicateCount += 1;
      await existing.save();

      return res.json({
        message: "Issue already reported earlier. Duplicate count updated.",
        issue: existing
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const issue = await Issue.create({
      title,
      description,
      category,
      locationText: location,
      imageUrl,
      createdBy: req.user._id
    });

    res.json(issue);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------------------------
// GET ALL ISSUES
// --------------------------------------------
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

// --------------------------------------------
// GET SINGLE ISSUE
// --------------------------------------------
router.get("/:id", protect, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --------------------------------------------
// ASSIGN ISSUE
// --------------------------------------------
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

    if (!updated) return res.status(404).json({ message: "Issue not found" });

    res.json({ message: "Issue assigned successfully", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --------------------------------------------
// UPDATE STATUS
// --------------------------------------------
router.patch("/status/:id", protect, officerOrAdmin, async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Issue not found" });

    res.json({ message: "Status updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE ISSUE (Only creator can delete)
router.delete("/:id", protect, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the logged-in user created this issue
    if (issue.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this issue" });
    }

    await issue.deleteOne();

    res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
