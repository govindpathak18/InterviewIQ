const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const userService = require("./user.service");

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await userService.getMyProfile(req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Profile fetched successfully",
    data: user,
  });
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateMyProfile(req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    data: user,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
  });
});

const listUsers = asyncHandler(async (req, res) => {
  const result = await userService.listUsers(req.query);

  return sendResponse(res, {
    statusCode: 200,
    message: "Users fetched successfully",
    data: result.users,
    meta: result.meta,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  return sendResponse(res, {
    statusCode: 200,
    message: "User fetched successfully",
    data: user,
  });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "User role updated successfully",
    data: user,
  });
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.isActive, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "User status updated successfully",
    data: user,
  });
});

module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
  listUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
};
