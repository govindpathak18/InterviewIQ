

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const rateLimitMiddleware = require("./middleware/rateLimit.middleware");
const env = require("./config/env");
const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middleware/error.middleware");

// Route imports
const authRoutes = require("./modules/auth/auth.routes");
const resumeRoutes = require("./modules/resume/resume.routes");
const jobDescriptionRoutes = require("./modules/jobDescription/jobDescription.routes")
const aiRoutes = require("./modules/ai/ai.routes");;
const interviewRoutes = require("./modules/interview/interview.routes");
// const userRoutes = require("./modules/user/user.routes");

const app = express();

// ---------- Security + Core middleware ----------
app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(morgan(env.isDev ? "dev" : "combined"));

app.use(
  express.json({
    limit: "2mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

app.use(cookieParser());
app.use(rateLimitMiddleware);

// ---------- Health ----------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// ---------- API routes ----------
app.use(`${env.apiPrefix}/auth`, authRoutes);
app.use(`${env.apiPrefix}/resume`, resumeRoutes);
app.use(`${env.apiPrefix}/job-description`, jobDescriptionRoutes);
app.use(`${env.apiPrefix}/ai`, aiRoutes);
app.use(`${env.apiPrefix}/interview`, interviewRoutes);
// app.use(`${env.apiPrefix}/users`, userRoutes);

// ---------- 404 handler ----------
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// ---------- Global error handler (always last) ----------
app.use(errorMiddleware);

module.exports = app;
