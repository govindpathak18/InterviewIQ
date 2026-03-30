const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const TokenBlacklist = require("./auth.model");
const ApiError = require("../../utils/ApiError");
const env = require("../../config/env");
const { generateRawToken, hashToken } = require("../../utils/tokenHash");
const { sendMail } = require("../../utils/mailer");
const {
  buildResetPasswordEmail,
} = require("../../templates/resetPassword.template");
const {
  buildEmailVerificationEmail,
} = require("../../templates/emailVerification.template");

const generateAccessToken = (payload) =>
  jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });

const decodeExpiryToDate = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) return new Date(Date.now() + 24 * 60 * 60 * 1000);
  return new Date(decoded.exp * 1000);
};

const blacklistToken = async (token, tokenType) => {
  if (!token) {
    return;
  }

  await TokenBlacklist.updateOne(
    { token },
    {
      $setOnInsert: {
        token,
        tokenType,
        expiresAt: decodeExpiryToDate(token),
      },
    },
    { upsert: true }
  );
};

const isBlacklisted = async (token) => {
  const exists = await TokenBlacklist.findOne({ token }).lean();
  return Boolean(exists);
};

const createOneTimeToken = async ({ userId, tokenType, expiresInMs }) => {
  const rawToken = generateRawToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + expiresInMs);

  await TokenBlacklist.create({
    userId,
    tokenHash,
    tokenType,
    expiresAt,
  });

  return rawToken;
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
  const user = await User.findOne({ email, isActive: true }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  user.lastLoginAt = new Date();
  await user.save();

  const payload = {
    userId: user._id,
    role: user.role,
    refreshTokenVersion: user.refreshTokenVersion,
  };

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
  if (!user || !user.isActive) {
    throw new ApiError(404, "User not found");
  }

  if (decoded.refreshTokenVersion !== user.refreshTokenVersion) {
    throw new ApiError(401, "Refresh token is no longer valid");
  }

  const payload = {
    userId: user._id,
    role: user.role,
    refreshTokenVersion: user.refreshTokenVersion,
  };

  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  await blacklistToken(refreshToken, "refresh");

  return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async ({ accessToken, refreshToken }) => {
  const tasks = [];

  if (accessToken) {
    tasks.push(blacklistToken(accessToken, "access"));
  }

  if (refreshToken) {
    tasks.push(blacklistToken(refreshToken, "refresh"));
  }

  await Promise.all(tasks);
  return true;
};

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email, isActive: true }).lean();

  if (!user) {
    return true;
  }

  const rawToken = await createOneTimeToken({
    userId: user._id,
    tokenType: "reset-password",
    expiresInMs: 15 * 60 * 1000,
  });

  const resetLink = `${env.resetPasswordUrl}?token=${rawToken}`;

  await sendMail({
    to: user.email,
    subject: "Reset your InterviewIQ password",
    html: buildResetPasswordEmail({
      fullName: user.fullName,
      resetLink,
    }),
    text: `Reset your password: ${resetLink}`,
  });

  return true;
};

const resetPassword = async ({ token, password }) => {
  const tokenHash = hashToken(token);

  const tokenDoc = await TokenBlacklist.findOne({
    tokenHash,
    tokenType: "reset-password",
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!tokenDoc) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const user = await User.findById(tokenDoc.userId).select("+password");
  if (!user || !user.isActive) {
    throw new ApiError(404, "User not found");
  }

  user.password = await bcrypt.hash(password, 10);
  user.refreshTokenVersion += 1;
  await user.save();

  tokenDoc.usedAt = new Date();
  await tokenDoc.save();

  return true;
};

const sendVerificationEmail = async ({ userId, email }) => {
  const user = userId
    ? await User.findOne({ _id: userId, isActive: true }).lean()
    : await User.findOne({ email, isActive: true }).lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  const rawToken = await createOneTimeToken({
    userId: user._id,
    tokenType: "email-verification",
    expiresInMs: 24 * 60 * 60 * 1000,
  });

  const verifyLink = `${env.emailVerifyUrl}?token=${rawToken}`;

  await sendMail({
    to: user.email,
    subject: "Verify your InterviewIQ email",
    html: buildEmailVerificationEmail({
      fullName: user.fullName,
      verifyLink,
    }),
    text: `Verify your email: ${verifyLink}`,
  });

  return true;
};

const verifyEmail = async ({ token }) => {
  const tokenHash = hashToken(token);

  const tokenDoc = await TokenBlacklist.findOne({
    tokenHash,
    tokenType: "email-verification",
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!tokenDoc) {
    throw new ApiError(400, "Invalid or expired verification token");
  }

  const user = await User.findById(tokenDoc.userId);
  if (!user || !user.isActive) {
    throw new ApiError(404, "User not found");
  }

  user.isEmailVerified = true;
  user.emailVerifiedAt = new Date();
  await user.save();

  tokenDoc.usedAt = new Date();
  await tokenDoc.save();

  return true;
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  isBlacklisted,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
