const mongoose = require("mongoose");
const Resume = require("./resume.model");
const ApiError = require("../../utils/ApiError");

const assertOwnership = (document, userId) => {
  if (!document || !document.isActive) {
    throw new ApiError(404, "Resume not found");
  }

  if (document.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this resume");
  }
};

const createResume = async (payload) => {
  const resume = await Resume.create(payload);
  return resume;
};

const getMyResumes = async (userId) => {
  return Resume.find({ userId, isActive: true }).sort({ createdAt: -1 });
};

const getResumeById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid resume id");
  }

  const resume = await Resume.findById(id);
  assertOwnership(resume, userId);
  return resume;
};

const updateResume = async (id, userId, updates) => {
  const resume = await getResumeById(id, userId);
  Object.assign(resume, updates);
  await resume.save();
  return resume;
};

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
