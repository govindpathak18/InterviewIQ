// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const rateLimitMiddleware = require("./middleware/rateLimit.middleware");
const env = require("./config/env");
const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middleware/error.middleware");
const apiRoutes = require("./routes");

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
app.use(env.apiPrefix, apiRoutes);

// ---------- 404 handler ----------
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// ---------- Global error handler (always last) ----------
app.use(errorMiddleware);

module.exports = app;
