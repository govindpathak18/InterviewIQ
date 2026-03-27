const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jdText: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobDescription", jobDescriptionSchema);