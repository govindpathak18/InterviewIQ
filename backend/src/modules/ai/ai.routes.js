const express = require("express");
const controller = require("./ai.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { createAiInterviewSchema, createAtsResumeSchema } = require("./ai.validation");

const router = express.Router();

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
