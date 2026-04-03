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
      trim: true,
      default: "My Resume",
      maxlength: 120,
    },
    originalText: {
      type: String,
      required: true,
      minlength: 50,
    },
    parsedData: {
      type: Object,
      default: {},
    },
    source: {
      type: String,
      enum: ["manual", "upload"],
      default: "manual",
      index: true,
    },
    fileName: {
      type: String,
      trim: true,
      default: "",
      maxlength: 255,
    },
    mimeType: {
      type: String,
      trim: true,
      default: "",
      maxlength: 120,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
resumeSchema.index({ userId: 1, isActive: 1 }, { name: "userId_isActive" });
resumeSchema.index({ userId: 1, createdAt: -1 }, { name: "userId_createdAt" });
resumeSchema.index({ _id: 1, userId: 1 }, { name: "_id_userId" }); // Fast access check

module.exports = mongoose.model("Resume", resumeSchema);
