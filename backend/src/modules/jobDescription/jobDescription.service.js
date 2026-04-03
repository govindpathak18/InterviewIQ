const mongoose = require("mongoose");
const JobDescription = require("./jobDescription.model");
const Resume = require("../resume/resume.model");
const ApiError = require("../../utils/ApiError");

/**
 * Validate that resume exists and belongs to user
 * @param {string} [resumeId] - Resume ID
 * @param {string} userId - User ID
 * @throws {ApiError} - If resume not found or unauthorized
 */
const ensureOwnedResume = async (resumeId, userId) => {
  if (!resumeId) {
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    throw new ApiError(400, "Invalid resume id");
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
    isActive: true,
  }).lean();

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }
};

/**
 * Validate job description ownership
 * @param {Object} document - Job description document
 * @param {string} userId - User ID
 * @throws {ApiError} - If not found or unauthorized
 */
const assertOwnership = (document, userId) => {
  if (!document || !document.isActive) {
    throw new ApiError(404, "Job description not found");
  }

  if (document.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this job description");
  }
};

/**
 * Create job description
 * @param {Object} payload - Job description data
 * @returns {Promise<Object>} - Created job description
 * @throws {ApiError} - If resume not found
 */
const createJobDescription = async (payload) => {
  await ensureOwnedResume(payload.resumeId, payload.userId);

  const document = await JobDescription.create(payload);
  return document;
};

/**
 * Get user's job descriptions (read-only, optimized with .lean())
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of job descriptions
 */
const getMyJobDescriptions = async (userId) => {
  return JobDescription.find({ userId, isActive: true })
    .sort({ createdAt: -1 })
    .lean(); // Performance optimization: returns plain JS objects
};

/**
 * Get job description by ID with ownership check
 * @param {string} id - Job description ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Job description document
 * @throws {ApiError} - If not found or unauthorized
 */
const getJobDescriptionById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid job description id");
  }

  // Don't use .lean() here because we may modify it later
  const document = await JobDescription.findById(id);
  assertOwnership(document, userId);
  return document;
};

/**
 * Update job description
 * @param {string} id - Job description ID
 * @param {string} userId - User ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} - Updated job description
 * @throws {ApiError} - If not found or unauthorized
 */
const updateJobDescription = async (id, userId, updates) => {
  const document = await getJobDescriptionById(id, userId);
  await ensureOwnedResume(updates.resumeId, userId);
  Object.assign(document, updates);
  await document.save();
  return document;
};

/**
 * Delete job description (soft delete)
 * @param {string} id - Job description ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Success status
 * @throws {ApiError} - If not found or unauthorized
 */
const deleteJobDescription = async (id, userId) => {
  const document = await getJobDescriptionById(id, userId);
  document.isActive = false;
  await document.save();
  return true;
};

module.exports = {
  createJobDescription,
  getMyJobDescriptions,
  getJobDescriptionById,
  updateJobDescription,
  deleteJobDescription,
};
