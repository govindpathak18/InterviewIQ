const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const ApiError = require("../../utils/ApiError");
const User = require("../user/user.model");
const authService = require("./auth.service");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
} = require("./auth.validation");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const register = asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      400,
      parsed.error.issues[0]?.message || "Invalid request body",
      parsed.error.issues.map((issue) => issue.message)
    );
  }

  const user = await authService.register(parsed.data);

  return sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      400,
      parsed.error.issues[0]?.message || "Invalid request body",
      parsed.error.issues.map((issue) => issue.message)
    );
  }

  const { user, accessToken, refreshToken } = await authService.login(parsed.data);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: { user, accessToken },
  });
});

const refresh = asyncHandler(async (req, res) => {
  const parsed = refreshSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      400,
      parsed.error.issues[0]?.message || "Invalid request body",
      parsed.error.issues.map((issue) => issue.message)
    );
  }

  const refreshToken = req.cookies?.refreshToken || parsed.data?.refreshToken;

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

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sendResponse(res, {
    statusCode: 200,
    message: "Current user fetched successfully",
    data: user,
  });
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  me,
};