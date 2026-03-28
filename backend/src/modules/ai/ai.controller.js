const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");
const aiService = require("./ai.service");
const { renderResumePdfFromHtml } = require("./ai.pdf");

const generateInterviewPack = asyncHandler(async (req, res) => {
  const data = await aiService.generateInterviewPack({
    userId: req.user._id,
    ...req.body,
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "Interview pack generated successfully",
    data,
  });
});

const generateAtsResume = asyncHandler(async (req, res) => {
  const data = await aiService.generateAtsResume({
    userId: req.user._id,
    ...req.body,
  });

  return sendResponse(res, {
    statusCode: 200,
    message: "ATS resume generated successfully",
    data,
  });
});

const generateAtsResumePdf = asyncHandler(async (req, res) => {
  const data = await aiService.generateAtsResume({
    userId: req.user._id,
    ...req.body,
  });

  const pdfBuffer = await renderResumePdfFromHtml(data.html);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="ats-resume.pdf"');

  return res.status(200).send(pdfBuffer);
});

module.exports = {
  generateInterviewPack,
  generateAtsResume,
  generateAtsResumePdf,
};
