const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    imageUrl: String,

    // USER–ENTERED LOCATION (text)
    locationText: String,

    // MAP COORDINATES
    location: {
      lat: Number,
      lng: Number
    },

    // USED FOR DUPLICATE DETECTION
    normalizedTitle: { type: String },
    normalizedLocation: { type: String },

    status: {
      type: String,
      enum: ["Pending", "Verified", "In Progress", "Resolved"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    duplicateCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
