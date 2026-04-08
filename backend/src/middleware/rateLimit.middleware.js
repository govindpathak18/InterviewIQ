const rateLimit = require("express-rate-limit");
const ApiError = require("../utils/ApiError");

/**
 * General API rate limiter - 100 requests per 15 minutes per IP
 * Uses default IP-based rate limiting
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, "Too many requests, please try again later"));
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

/**
 * Auth rate limiter - 5 requests per 15 minutes (stricter for auth)
 * Uses default IP-based rate limiting
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many authentication attempts",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, "Too many authentication attempts. Please try again after 15 minutes"));
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

/**
 * AI API rate limiter - 10 requests per hour per user (CRITICAL - Gemini API has costs)
 * Uses default IP-based rate limiting
 */
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour per user
  message: "Too many AI requests",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, "AI request limit exceeded. Maximum 10 requests per hour"));
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

/**
 * Resume upload rate limiter - 20 uploads per day per user
 * Uses default IP-based rate limiting
 */
const uploadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 20, // 20 requests per day
  message: "Too many resume uploads",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, "Resume upload limit exceeded. Maximum 20 uploads per day"));
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

module.exports = {
  generalLimiter,
  authLimiter,
  aiLimiter,
  uploadLimiter,
};