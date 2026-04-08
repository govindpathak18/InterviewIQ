const mongoose = require("mongoose");
const Resume = require("./resume.model");
const ApiError = require("../../utils/ApiError");

/**
 * Validate resume ownership
 * @param {Object} document - Resume document
 * @param {string} userId - User ID
 * @throws {ApiError} - If not found or unauthorized
 */
const assertOwnership = (document, userId) => {
  if (!document || !document.isActive) {
    throw new ApiError(404, "Resume not found");
  }

  if (document.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this resume");
  }
};

/**
 * Create resume
 * @param {Object} payload - Resume data
 * @returns {Promise<Object>} - Created resume
 */
const createResume = async (payload) => {
  const resume = await Resume.create(payload);
  return resume;
};

/**
 * Get user's resumes (read-only, optimized with .lean())
 * @param {string} userId - User ID
 * @param {number} [page=1] - Page number (1-based)
 * @param {number} [limit=10] - Number of resumes per page
 * @returns {Promise<Object>} - Object with resumes array and pagination info
 */
const getMyResumes = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Resume.countDocuments({ userId, isActive: true });
  const resumes = await Resume.find({ userId, isActive: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Performance optimization: returns plain JS objects

  return {
    resumes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get resume by ID with ownership check
 * @param {string} id - Resume ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Resume document
 * @throws {ApiError} - If not found or unauthorized
 */
const getResumeById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid resume id");
  }

  // Don't use .lean() here because we may modify it later
  const resume = await Resume.findById(id);
  assertOwnership(resume, userId);
  return resume;
};

/**
 * Update resume
 * @param {string} id - Resume ID
 * @param {string} userId - User ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} - Updated resume
 * @throws {ApiError} - If not found or unauthorized
 */
const updateResume = async (id, userId, updates) => {
  const resume = await getResumeById(id, userId);
  Object.assign(resume, updates);
  await resume.save();
  return resume;
};

/**
 * Delete resume (soft delete)
 * @param {string} id - Resume ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Success status
 * @throws {ApiError} - If not found or unauthorized
 */
const deleteResume = async (id, userId) => {
  const resume = await getResumeById(id, userId);
  resume.isActive = false;
  await resume.save();
  return true;
};

module.exports = {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
