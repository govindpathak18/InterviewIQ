const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;


// ho to use
/*

const asyncHandler = require("../utils/asyncHandler");
const response = require("../utils/response");
const ApiError = require("../utils/ApiError");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return response(res, {
    statusCode: 200,
    message: "Profile fetched successfully",
    data: user,
  });
});
*/
