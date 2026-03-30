const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./user.model");
const ApiError = require("../../utils/ApiError");

const safeUserSelect = "-password -__v";

const assertValidUserId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id");
  }
};

const getMyProfile = async (userId) => {
  const user = await User.findOne({ _id: userId, isActive: true }).select(safeUserSelect).lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateMyProfile = async (userId, updates) => {
  const user = await User.findOne({ _id: userId, isActive: true }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, updates);
  await user.save();

  return User.findById(userId).select(safeUserSelect).lean();
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findOne({ _id: userId, isActive: true }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new ApiError(400, "New password must be different from current password");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.refreshTokenVersion += 1;
  await user.save();

  return true;
};

const listUsers = async ({ role, isActive, search, page, limit }) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (typeof isActive === "boolean") {
    filter.isActive = isActive;
  }

  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { headline: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter).select(safeUserSelect).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  return {
    users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getUserById = async (id) => {
  assertValidUserId(id);

  const user = await User.findById(id).select(safeUserSelect).lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUserRole = async (id, role, actorId) => {
  assertValidUserId(id);

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === actorId.toString() && role !== "admin") {
    throw new ApiError(400, "Admins cannot demote themselves");
  }

  user.role = role;
  await user.save();

  return User.findById(id).select(safeUserSelect).lean();
};

const updateUserStatus = async (id, isActive, actorId) => {
  assertValidUserId(id);

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === actorId.toString() && !isActive) {
    throw new ApiError(400, "You cannot deactivate your own account");
  }

  user.isActive = isActive;
  if (!isActive) {
    user.refreshTokenVersion += 1;
  }

  await user.save();

  return User.findById(id).select(safeUserSelect).lean();
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
  listUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
};
