const ApiError = require("../../utils/ApiError");
const aiService = require("../ai/ai.service");
const Interview = require("./interview.model");
const Resume = require("../resume/resume.model");
const JobDescription = require("../jobDescription/jobDescription.model");
const mongoose = require("mongoose");

/**
 * Generate an interview pack based on resume, job description, and self description
 * @param {Object} params - Parameters
 * @param {string} params.userId - User ID
 * @param {string} params.resumeId - Resume ID
 * @param {string} params.jobDescriptionId - Job Description ID
 * @param {string} [params.selfDescription] - Optional self description
 * @returns {Promise<Object>} Interview with AI-generated content
 * @throws {ApiError} If resume or JD not found or user doesn't own them
 */
const generateInterview = async ({ userId, resumeId, jobDescriptionId, selfDescription }) => {
  // Validate ownership of resume and job description (CRITICAL SECURITY FIX)
  const resumePromise = Resume.findOne({ _id: resumeId, userId, isActive: true }).lean();
  const jdPromise = JobDescription.findOne({ _id: jobDescriptionId, userId, isActive: true }).lean();

  const [resume, jd] = await Promise.all([resumePromise, jdPromise]);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (!jd) {
    throw new ApiError(404, "Job description not found");
  }

  const aiOutput = await aiService.generateInterviewPack({
    userId,
    resumeId,
    jobDescriptionId,
    selfDescription,
  });

  // AI output is already validated in ai.service.js
  const interview = await Interview.create({
    userId,
    resumeId,
    jobDescriptionId,
    selfDescription: selfDescription || "",
    summary: aiOutput.summary,
    matchScore: aiOutput.matchScore,
    questions: aiOutput.questions,
    skillGap: aiOutput.skillGap,
    preparationPlan: aiOutput.preparationPlan,
    aiMeta: aiOutput.aiMeta,
  });

  return interview;
};

/**
 * Get user's interviews with pagination
 * @param {string} userId - User ID
 * @param {Object} [options] - Pagination options
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=20] - Items per page
 * @returns {Promise<Object>} - Interviews and metadata
 */
const getMyInterviews = async (userId, { page = 1, limit = 20 } = {}) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const skip = (page - 1) * limit;

  const [interviews, total] = await Promise.all([
    Interview.find({ userId, isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Interview.countDocuments({ userId, isActive: true }),
  ]);

  return {
    interviews,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

/**
 * Get interview by ID with ownership check
 * @param {string} id - Interview ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Promise<Object>} - Interview document
 * @throws {ApiError} - If not found or unauthorized
 */
const getInterviewById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid interview id");
  }

  const interview = await Interview.findById(id);
  if (!interview || !interview.isActive) {
    throw new ApiError(404, "Interview not found");
  }
  if (interview.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this interview");
  }
  return interview;
};

/**
 * Update interview with validation
 * @param {string} id - Interview ID
 * @param {string} userId - User ID (for authorization)
 * @param {Object} payload - Update data
 * @returns {Promise<Object>} - Updated interview
 * @throws {ApiError} - If not found or unauthorized
 */
const updateInterview = async (id, userId, payload) => {
  const interview = await getInterviewById(id, userId);
  
  // Only allow updating specific fields
  const allowedFields = ["status", "notes"];
  const updates = {};
  
  allowedFields.forEach((field) => {
    if (field in payload) {
      updates[field] = payload[field];
    }
  });

  Object.assign(interview, updates);
  await interview.save();
  return interview;
};

/**
 * Delete interview (soft delete)
 * @param {string} id - Interview ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Promise<boolean>} - Success status
 * @throws {ApiError} - If not found or unauthorized
 */
const deleteInterview = async (id, userId) => {
  const interview = await getInterviewById(id, userId);
  interview.isActive = false;
  await interview.save();
  return true;
};

module.exports = {
  generateInterview,
  getMyInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
};
