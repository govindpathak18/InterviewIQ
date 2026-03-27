const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const TokenBlacklist = require("./auth.model");
const ApiError = require("../../utils/ApiError");
const env = require("../../config/env");

const generateAccessToken = (payload) =>
  jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });

const decodeExpiryToDate = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) return new Date(Date.now() + 24 * 60 * 60 * 1000);
  return new Date(decoded.exp * 1000);
};

const isBlacklisted = async (token) => {
  const exists = await TokenBlacklist.findOne({ token }).lean();
  return Boolean(exists);
};

const register = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const safeUser = await User.findById(user._id).select("-password").lean();
  return safeUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const payload = { userId: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const safeUser = await User.findById(user._id).select("-password").lean();

  return { user: safeUser, accessToken, refreshToken };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(401, "Refresh token missing");

  if (await isBlacklisted(refreshToken)) {
    throw new ApiError(401, "Refresh token is blacklisted");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.jwt.refreshSecret);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  const payload = { userId: user._id, role: user.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // rotate old refresh token -> blacklist old one
  await TokenBlacklist.create({
    token: refreshToken,
    tokenType: "refresh",
    expiresAt: decodeExpiryToDate(refreshToken),
  });

  return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async ({ accessToken, refreshToken }) => {
  const tasks = [];

  if (accessToken) {
    tasks.push(
      TokenBlacklist.create({
        token: accessToken,
        tokenType: "access",
        expiresAt: decodeExpiryToDate(accessToken),
      })
    );
  }

  if (refreshToken) {
    tasks.push(
      TokenBlacklist.create({
        token: refreshToken,
        tokenType: "refresh",
        expiresAt: decodeExpiryToDate(refreshToken),
      })
    );
  }

  await Promise.all(tasks);
  return true;
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  isBlacklisted,
};