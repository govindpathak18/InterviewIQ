const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const resumeService = require("./resume.service");
const { parseResumeTextFromFile } = require("./resume.parser");

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

const uploadResume = asyncHandler(async (req, res) => {
  const originalText = await parseResumeTextFromFile(req.file);

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

const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getMyResumes(req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resumes fetched successfully",
    data: resumes,
  });
});

const getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id, req.user._id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resume fetched successfully",
    data: resume,
  });
});

const updateResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.updateResume(req.params.id, req.user._id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    message: "Resume updated successfully",
    data: resume,
  });
});

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
