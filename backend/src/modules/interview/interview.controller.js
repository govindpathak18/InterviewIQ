const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const interviewService = require("./interview.service");

const generateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.generateInterview({
    userId: req.user._id,
    ...req.body,
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Interview generated successfully",
    data: interview,
  });
});

const getMyInterviews = asyncHandler(async (req, res) => {
  const interviews = await interviewService.getMyInterviews(req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interviews fetched successfully",
    data: interviews,
  });
});

const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterviewById(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview fetched successfully",
    data: interview,
  });
});

const updateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.updateInterview(req.params.id, req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview updated successfully",
    data: interview,
  });
});

const deleteInterview = asyncHandler(async (req, res) => {
  await interviewService.deleteInterview(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview deleted successfully",
  });
});

module.exports = {
  generateInterview,
  getMyInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
};
