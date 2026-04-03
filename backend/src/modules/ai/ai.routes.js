const express = require("express");
const controller = require("./ai.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { aiLimiter } = require("../../middleware/rateLimit.middleware");
const { createAiInterviewSchema, createAtsResumeSchema } = require("./ai.validation");

const router = express.Router();

// Apply rate limiting to all AI endpoints (CRITICAL SECURITY FIX)
router.use(aiLimiter);

router.post(
  "/interview-pack",
  authenticate,
  validate(createAiInterviewSchema),
  controller.generateInterviewPack
);

router.post(
  "/ats-resume",
  authenticate,
  validate(createAtsResumeSchema),
  controller.generateAtsResume
);

router.post(
  "/ats-resume/pdf",
  authenticate,
  validate(createAtsResumeSchema),
  controller.generateAtsResumePdf
);

module.exports = router;
