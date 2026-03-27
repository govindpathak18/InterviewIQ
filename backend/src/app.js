const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const env = require("./config/env");
const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middleware/error.middleware");

// Route imports 
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const resumeRoutes = require("./modules/resume/resume.routes");
const jobRoutes = require("./modules/jobs/jobs.routes");
const interviewRoutes = require("./modules/interview/interview.routes");
const aiRoutes = require("./modules/ai/ai.routes");

const app = express();

// ---------- Security + Core middleware ----------
app.use(helmet()); // helps secure Express app by setting HTTP headers automatically

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true, // needed for cookies
  })
);

app.use(morgan(env.isDev ? "dev" : "combined")); // logs incoming HTTP requests.

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

// ---------- Rate limiting ----------
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests/window/IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(globalLimiter);

// ---------- Health ----------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// ---------- API routes ----------
app.use(`${env.apiPrefix}/auth`, authRoutes);
app.use(`${env.apiPrefix}/users`, userRoutes);
app.use(`${env.apiPrefix}/resume`, resumeRoutes);
app.use(`${env.apiPrefix}/jobs`, jobRoutes);
app.use(`${env.apiPrefix}/interview`, interviewRoutes);
app.use(`${env.apiPrefix}/ai`, aiRoutes);

// ---------- 404 handler ----------
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// ---------- Global error handler ----------
app.use(errorMiddleware);

module.exports = app;