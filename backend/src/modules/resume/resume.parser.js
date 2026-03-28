const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const ApiError = require("../../utils/ApiError");

const parseResumeTextFromFile = async (file) => {
  if (!file) {
    throw new ApiError(400, "Resume file is required");
  }

  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    const text = data.text?.trim();

    if (!text) {
      throw new ApiError(400, "Could not extract text from the uploaded PDF");
    }

    return text;
  }

  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword"
  ) {
    const data = await mammoth.extractRawText({ buffer: file.buffer });
    const text = data.value?.trim();

    if (!text) {
      throw new ApiError(400, "Could not extract text from the uploaded DOC/DOCX");
    }

    return text;
  }

  throw new ApiError(400, "Only PDF, DOC, and DOCX files are supported");
};

module.exports = {
  parseResumeTextFromFile,
};
