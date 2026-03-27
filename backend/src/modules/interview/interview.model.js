const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["technical", "behavioral", "hr", "system-design"],
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
  },
  { _id: false }
);

const dayPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: { type: [String], default: [] },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
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
      required: true,
    },
    jobDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDescription",
      required: true,
    },

    selfDescription: {
      type: String,
      default: "",
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    skillGap: {
      missingSkills: { type: [String], default: [] },
      weakAreas: { type: [String], default: [] },
      strengths: { type: [String], default: [] },
    },

    preparationPlan: {
      type: [dayPlanSchema],
      default: [],
    },

    aiMeta: {
      model: { type: String, default: "" },
      promptVersion: { type: String, default: "v1" },
      tokensUsed: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);