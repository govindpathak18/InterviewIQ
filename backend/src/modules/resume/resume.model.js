const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Primary Resume",
    },
    originalText: {
      type: String,
      required: true,
    },
    parsedData: {
      type: Object, // later can be stricter
      default: {},
    },
    source: {
      type: String,
      enum: ["upload", "manual"],
      default: "manual",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);