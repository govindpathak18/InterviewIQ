const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const jobDescriptionService = require("./jobDescription.service");

const createJobDescription = asyncHandler(async (req, res) => {
  const document = await jobDescriptionService.createJobDescription({
    ...req.body,
    userId: req.user._id,
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Job description created successfully",
    data: document,
  });
});

const getMyJobDescriptions = asyncHandler(async (req, res) => {
  const list = await jobDescriptionService.getMyJobDescriptions(req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Job descriptions fetched successfully",
    data: list,
  });
});

const getJobDescriptionById = asyncHandler(async (req, res) => {
  const document = await jobDescriptionService.getJobDescriptionById(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Job description fetched successfully",
    data: document,
  });
});

const updateJobDescription = asyncHandler(async (req, res) => {
  const document = await jobDescriptionService.updateJobDescription(
    req.params.id,
    req.user._id,
    req.body
  );

  return sendResponse(res, {
    statusCode: 200,
    message: "Job description updated successfully",
    data: document,
  });
});

const deleteJobDescription = asyncHandler(async (req, res) => {
  await jobDescriptionService.deleteJobDescription(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Job description deleted successfully",
  });
});

module.exports = {
  createJobDescription,
  getMyJobDescriptions,
  getJobDescriptionById,
  updateJobDescription,
  deleteJobDescription,
};
