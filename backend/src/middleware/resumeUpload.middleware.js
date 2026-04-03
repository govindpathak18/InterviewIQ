const multer = require("multer");
const ApiError = require("../utils/ApiError");

/**
 * Allowed MIME types for resume upload
 */
const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Use memory storage to avoid disk I/O
 */
const storage = multer.memoryStorage();

/**
 * File filter to validate MIME types
 */
const fileFilter = (req, file, callback) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new ApiError(400, `File type not allowed. Allowed types: PDF, DOC, DOCX. Got: ${file.mimetype}`),
      false
    );
  }

  return callback(null, true);
};

/**
 * Configure multer for resume uploads
 */
const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1, // Only one file
  },
});

module.exports = uploadResume;
