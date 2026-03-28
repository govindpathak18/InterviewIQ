const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },
    roleTitle: {
      type: String,
      trim: true,
      default: "",
      maxlength: 120,
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
      maxlength: 120,
    },
    jobPostUrl: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    jdText: {
      type: String,
      required: true,
      minlength: 50,
    },
    extractedSkills: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ["intern", "junior", "mid", "senior", "lead", "not_specified"],
      default: "not_specified",
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "not_specified"],
      default: "not_specified",
    },
    location: {
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

jobDescriptionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("JobDescription", jobDescriptionSchema);
