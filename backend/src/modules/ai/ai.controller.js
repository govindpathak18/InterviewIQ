const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const aiService = require("./ai.service");
const { renderResumePdfFromHtml } = require("./ai.pdf");

/**
 * Generate interview pack based on resume and job description
 * @route POST /ai/interview-pack
 * @access Private
 */
const generateInterviewPack = asyncHandler(async (req, res) => {
  const data = await aiService.generateInterviewPack({
    userId: req.user._id,
    ...req.body,
  });

  return sendResponse(res, {
    statusCode: 201, // Fixed: was 200, changed to 201 (Created)
    message: "Interview pack generated successfully",
    data,
  });
});

/**
 * Generate ATS-friendly resume in HTML format
 * @route POST /ai/ats-resume
 * @access Private
 */
const generateAtsResume = asyncHandler(async (req, res) => {
  const data = await aiService.generateAtsResume({
    userId: req.user._id,
    ...req.body,
  });

  return sendResponse(res, {
    statusCode: 201, // Fixed: was 200, changed to 201 (Created)
    message: "ATS resume generated successfully",
    data,
  });
});

/**
 * Generate ATS-friendly resume as PDF
 * @route POST /ai/ats-resume/pdf
 * @access Private
 */
const generateAtsResumePdf = asyncHandler(async (req, res) => {
  const data = await aiService.generateAtsResume({
    userId: req.user._id,
    ...req.body,
  });

  const pdfBuffer = await renderResumePdfFromHtml(data.html);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="ats-resume.pdf"');

  return res.status(201).send(pdfBuffer);
});

module.exports = {
  generateInterviewPack,
  generateAtsResume,
  generateAtsResumePdf,
};
