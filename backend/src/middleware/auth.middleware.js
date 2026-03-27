const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");
const User = require("../modules/user/user.model");
const { isBlacklisted } = require("../modules/auth/auth.service");

const extractAccessToken = (req) => {
  // 1) Cookie token 
  if (req.cookies?.accessToken) return req.cookies.accessToken;

  // 2) Bearer token fallback
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

const authenticate = async (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      return next(new ApiError(401, "Access token missing"));
    }

    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      return next(new ApiError(401, "Access token is blacklisted"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, env.jwt.accessSecret);
    } catch {
      return next(new ApiError(401, "Invalid or expired access token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = {
      _id: user._id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    };

    return next();
  } catch (error) {
    return next(new ApiError(500, error.message || "Authentication failed"));
  }
};

// Optional RBAC middleware
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, "Unauthorized"));

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, "Forbidden: insufficient permissions"));
  }

  return next();
};

module.exports = {
  authenticate,
  authorize,
};