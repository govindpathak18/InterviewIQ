const mongoose = require("mongoose");
const JobDescription = require("./jobDescription.model");
const Resume = require("../resume/resume.model");
const ApiError = require("../../utils/ApiError");

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

const assertOwnership = (document, userId) => {
  if (!document || !document.isActive) {
    throw new ApiError(404, "Job description not found");
  }

  if (document.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this job description");
  }
};

const createJobDescription = async (payload) => {
  await ensureOwnedResume(payload.resumeId, payload.userId);

  const document = await JobDescription.create(payload);
  return document;
};

const getMyJobDescriptions = async (userId) => {
  return JobDescription.find({ userId, isActive: true }).sort({ createdAt: -1 });
};

const getJobDescriptionById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid job description id");
  }

  const document = await JobDescription.findById(id);
  assertOwnership(document, userId);
  return document;
};

const updateJobDescription = async (id, userId, updates) => {
  const document = await getJobDescriptionById(id, userId);
  await ensureOwnedResume(updates.resumeId, userId);
  Object.assign(document, updates);
  await document.save();
  return document;
};

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
