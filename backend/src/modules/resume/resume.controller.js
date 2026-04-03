const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const ApiError = require("../../utils/ApiError");
const resumeService = require("./resume.service");
const { parseResumeTextFromFile } = require("./resume.parser");

/**
 * Create resume manually
 * @route POST /resume
 * @access Private
 */
const createManualResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.createResume({
    ...req.body,
    userId: req.user._id,
    source: "manual",
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Resume created successfully",
    data: resume,
  });
});

/**
 * Upload and parse resume file
 * @route POST /resume/upload
 * @access Private
 */
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const originalText = await parseResumeTextFromFile(req.file);

  // Validate parse success (CRITICAL FIX)
  if (!originalText || originalText.trim().length < 50) {
    throw new ApiError(400, "Failed to extract resume text. Please ensure file is valid and not corrupted.");
  }

  const resume = await resumeService.createResume({
    userId: req.user._id,
    title: req.body.title || req.file.originalname || "Uploaded Resume",
    originalText,
    source: "upload",
    fileName: req.file.originalname || "",
    mimeType: req.file.mimetype || "",
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Resume uploaded and parsed successfully",
    data: resume,
  });
});

/**
 * Get user's resumes
 * @route GET /resume/my
 * @access Private
 */
const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getMyResumes(req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resumes fetched successfully",
    data: resumes,
  });
});

/**
 * Get resume by ID
 * @route GET /resume/:id
 * @access Private
 */
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resume fetched successfully",
    data: resume,
  });
});

/**
 * Update resume
 * @route PATCH /resume/:id
 * @access Private
 */
const updateResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.updateResume(req.params.id, req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resume updated successfully",
    data: resume,
  });
});

/**
 * Delete resume (soft delete)
 * @route DELETE /resume/:id
 * @access Private
 */
const deleteResume = asyncHandler(async (req, res) => {
  await resumeService.deleteResume(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resume deleted successfully",
  });
});

module.exports = {
  createManualResume,
  uploadResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
