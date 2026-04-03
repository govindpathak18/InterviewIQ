const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["technical", "behavioral", "hr", "system-design", "other"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const dayPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true, trim: true },
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
      index: true,
    },
    jobDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDescription",
      required: true,
      index: true,
    },
    selfDescription: {
      type: String,
      default: "",
      maxlength: 5000,
    },
    summary: {
      type: String,
      default: "",
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    questions: {
      type: [questionSchema],
      default: [],
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
      usageMetadata: { type: Object, default: null },
    },
    status: {
      type: String,
      enum: ["generated", "in-progress", "completed"],
      default: "generated",
      index: true,
    },
    notes: {
      type: String,
      default: "",
      maxlength: 3000,
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
interviewSchema.index({ userId: 1, isActive: 1 }, { name: "userId_isActive" });
interviewSchema.index({ userId: 1, createdAt: -1 }, { name: "userId_createdAt" });
interviewSchema.index({ _id: 1, userId: 1 }, { name: "_id_userId" }); // Fast access check
interviewSchema.index({ resumeId: 1, jobDescriptionId: 1 }, { name: "resumeId_jobDescriptionId" });

module.exports = mongoose.model("Interview", interviewSchema);
