const express = require("express");

// Route imports
const authRoutes = require("./modules/auth/auth.routes");
const resumeRoutes = require("./modules/resume/resume.routes");
const jobDescriptionRoutes = require("./modules/jobDescription/jobDescription.routes");
const aiRoutes = require("./modules/ai/ai.routes");
const interviewRoutes = require("./modules/interview/interview.routes");
const userRoutes = require("./modules/user/user.routes");




// ---------- API routes ----------
app.use(`${env.apiPrefix}/auth`, authRoutes);
app.use(`${env.apiPrefix}/resume`, resumeRoutes);
app.use(`${env.apiPrefix}/job-description`, jobDescriptionRoutes);
app.use(`${env.apiPrefix}/ai`, aiRoutes);
app.use(`${env.apiPrefix}/interview`, interviewRoutes);
app.use(`${env.apiPrefix}/users`, userRoutes);
