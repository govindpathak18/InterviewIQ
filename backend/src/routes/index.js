const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const resumeRoutes = require("../modules/resume/resume.routes");
const jobDescriptionRoutes = require("../modules/jobDescription/jobDescription.routes");
const aiRoutes = require("../modules/ai/ai.routes");
const interviewRoutes = require("../modules/interview/interview.routes");
const userRoutes = require("../modules/user/user.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/job-description", jobDescriptionRoutes);
router.use("/ai", aiRoutes);
router.use("/interview", interviewRoutes);
router.use("/users", userRoutes);

module.exports = router;
