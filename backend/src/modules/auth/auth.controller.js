const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const ApiError = require("../../utils/ApiError");
const User = require("../user/user.model");
const authService = require("./auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: { user, accessToken },
  });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  const { user, accessToken, refreshToken: newRefreshToken } =
    await authService.refresh(refreshToken);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Token refreshed successfully",
    data: { user, accessToken },
  });
});

const logout = asyncHandler(async (req, res) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  await authService.logout({ accessToken, refreshToken });

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return sendResponse(res, {
    statusCode: 200,
    message: "Logout successful",
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user || !user.isActive) {
    throw new ApiError(404, "User not found");
  }

  return sendResponse(res, {
    statusCode: 200,
    message: "Current user fetched successfully",
    data: user,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "If that email exists, a password reset link has been sent",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Password reset successfully",
  });
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  await authService.sendVerificationEmail({
    userId: req.user?._id,
    email: req.body?.email,
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Verification email sent successfully",
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmail(req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Email verified successfully",
  });
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
