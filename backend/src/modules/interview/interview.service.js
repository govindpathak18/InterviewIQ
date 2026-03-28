const ApiError = require("../../utils/ApiError");
const aiService = require("../ai/ai.service");
const Interview = require("./interview.model");

const generateInterview = async ({ userId, resumeId, jobDescriptionId, selfDescription }) => {
  const aiOutput = await aiService.generateInterviewPack({
    userId,
    resumeId,
    jobDescriptionId,
    selfDescription,
  });

  const interview = await Interview.create({
    userId,
    resumeId,
    jobDescriptionId,
    selfDescription: selfDescription || "",
    summary: aiOutput.summary || "",
    matchScore: aiOutput.matchScore || 0,
    questions: Array.isArray(aiOutput.questions) ? aiOutput.questions : [],
    skillGap: aiOutput.skillGap || {
      missingSkills: [],
      weakAreas: [],
      strengths: [],
    },
    preparationPlan: Array.isArray(aiOutput.preparationPlan) ? aiOutput.preparationPlan : [],
    aiMeta: aiOutput.aiMeta || null,
  });

  return interview;
};

const getMyInterviews = async (userId) => {
  return Interview.find({ userId, isActive: true }).sort({ createdAt: -1 });
};

const getInterviewById = async (id, userId) => {
  const interview = await Interview.findById(id);
  if (!interview || !interview.isActive) {
    throw new ApiError(404, "Interview not found");
  }
  if (interview.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this interview");
  }
  return interview;
};

const updateInterview = async (id, userId, payload) => {
  const interview = await getInterviewById(id, userId);
  Object.assign(interview, payload);
  await interview.save();
  return interview;
};

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
