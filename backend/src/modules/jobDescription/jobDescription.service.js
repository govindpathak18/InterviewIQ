const mongoose = require("mongoose");
const JobDescription = require("./jobDescription.model");
const ApiError = require("../../utils/ApiError");

const assertOwnership = (document, userId) => {
  if (!document || !document.isActive) {
    throw new ApiError(404, "Job description not found");
  }

  if (document.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this job description");
  }
};

const createJobDescription = async (payload) => {
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
