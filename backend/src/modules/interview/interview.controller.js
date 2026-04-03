const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const interviewService = require("./interview.service");

/**
 * Generate interview based on resume and job description
 * @route POST /interview/generate
 * @access Private
 */
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

/**
 * Get user's interviews with pagination
 * @route GET /interview/my
 * @access Private
 * @query {number} page - Page number (default: 1)
 * @query {number} limit - Items per page (default: 20)
 */
const getMyInterviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const result = await interviewService.getMyInterviews(req.user._id, {
    page: parseInt(page),
    limit: parseInt(limit),
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Interviews fetched successfully",
    data: result.interviews,
    meta: result.meta,
  });
});

/**
 * Get interview by ID
 * @route GET /interview/:id
 * @access Private
 */
const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterviewById(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview fetched successfully",
    data: interview,
  });
});

/**
 * Update interview
 * @route PATCH /interview/:id
 * @access Private
 */
const updateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.updateInterview(req.params.id, req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview updated successfully",
    data: interview,
  });
});

/**
 * Delete interview (soft delete)
 * @route DELETE /interview/:id
 * @access Private
 */
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
