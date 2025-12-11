const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    imageUrl: String,

    locationText: String,
    location: {
      lat: Number,
      lng: Number
    },

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
