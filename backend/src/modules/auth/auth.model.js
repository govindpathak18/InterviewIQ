const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    tokenHash: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    tokenType: {
      type: String,
      enum: ["access", "refresh", "reset-password", "email-verification"],
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("TokenBlacklist", tokenSchema);
