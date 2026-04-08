const ApiError = require("../../utils/ApiError");
const Resume = require("../resume/resume.model");
const JobDescription = require("../jobDescription/jobDescription.model");
const { buildInterviewPrompt } = require("../../prompts/interview.prompt");
const { buildAtsPrompt } = require("../../prompts/ats.prompt");
const { generateFromGemini } = require("./ai.adapter");
const { validateAiOutput } = require("./ai.schema");

/**
 * Parse JSON response from Gemini with improved error handling
 * @param {string} rawText - Raw response text from Gemini
 * @returns {Object} - Parsed JSON object
 * @throws {ApiError} - If parsing fails
 */
const parseGeminiJson = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new ApiError(502, "Invalid response from AI: empty or non-string response");
  }

  try {
    return JSON.parse(rawText);
  } catch {
    // Try to extract JSON from markdown-wrapped response
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new ApiError(502, "AI response was not valid JSON format");
    }

    const slice = rawText.slice(start, end + 1);
    try {
      return JSON.parse(slice);
    } catch (parseError) {
      throw new ApiError(502, `AI response JSON parsing failed: ${parseError.message}`);
    }
  }
};

/**
 * Resolve resume data from either ID or direct text
 * @param {string} userId - User ID for authorization
 * @param {string} [resumeId] - Resume document ID
 * @param {string} [resumeText] - Direct resume text
 * @returns {Promise<string>} - Resume text
 * @throws {ApiError} - If resume not found
 */
const resolveResumeData = async (userId, resumeId, resumeText) => {
  let finalResumeText = resumeText;

  if (!finalResumeText && resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, userId, isActive: true }).lean();
    if (!resume) {
      throw new ApiError(404, "Resume not found or you don't have access to it");
    }
    finalResumeText = resume.originalText;
  }

  if (!finalResumeText || finalResumeText.trim().length < 500) {
    throw new ApiError(400, "Resume text must be provided and contain at least 500 characters");
  }

  return finalResumeText;
};

/**
 * Resolve job description data from either ID or direct text
 * @param {string} userId - User ID for authorization
 * @param {string} [jobDescriptionId] - Job description document ID
 * @param {string} [jdText] - Direct job description text
 * @returns {Promise<string>} - Job description text
 * @throws {ApiError} - If job description not found
 */
const resolveJobDescriptionData = async (userId, jobDescriptionId, jdText) => {
  let finalJdText = jdText;

  if (!finalJdText && jobDescriptionId) {
    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId, isActive: true }).lean();
    if (!jd) {
      throw new ApiError(404, "Job description not found or you don't have access to it");
    }
    finalJdText = jd.jdText;
  }

  if (!finalJdText || finalJdText.trim().length < 500) {
    throw new ApiError(400, "Job description must be provided and contain at least 500 characters");
  }

  return finalJdText;
};

/**
 * Normalize self description input
 * @param {any} value - Value to normalize
 * @returns {string} - Normalized self description
 */
const normalizeSelfDescription = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};

/**
 * Generate interview pack with AI
 * @param {Object} params - Parameters
 * @param {string} params.userId - User ID
 * @param {string} [params.resumeId] - Resume ID
 * @param {string} [params.jobDescriptionId] - Job Description ID
 * @param {string} [params.resumeText] - Direct resume text
 * @param {string} [params.jdText] - Direct job description text
 * @param {string} [params.selfDescription] - Self description
 * @returns {Promise<Object>} - Interview pack with validation
 * @throws {ApiError} - If generation fails
 */
const generateInterviewPack = async ({
  userId,
  resumeId,
  jobDescriptionId,
  resumeText,
  jdText,
  selfDescription,
}) => {
  const finalResumeText = await resolveResumeData(userId, resumeId, resumeText);
  const finalJdText = await resolveJobDescriptionData(userId, jobDescriptionId, jdText);

  const prompt = buildInterviewPrompt({
    resumeText: finalResumeText,
    jdText: finalJdText,
    selfDescription: normalizeSelfDescription(selfDescription),
  });

  const geminiResult = await generateFromGemini({ prompt });
  const parsed = parseGeminiJson(geminiResult.rawText);

  // Validate AI output against schema (CRITICAL SECURITY FIX)
  let validated;
  try {
    validated = validateAiOutput(parsed);
  } catch (error) {
    throw new ApiError(502, error.message);
  }

  return {
    ...validated,
    aiMeta: {
      model: geminiResult.model,
      usageMetadata: geminiResult.usageMetadata,
    },
  };
};

/**
 * Generate ATS-friendly resume with AI
 * @param {Object} params - Parameters
 * @param {string} params.userId - User ID
 * @param {string} [params.resumeId] - Resume ID
 * @param {string} [params.jobDescriptionId] - Job Description ID
 * @param {string} [params.resumeText] - Direct resume text
 * @param {string} [params.jdText] - Direct job description text
 * @returns {Promise<Object>} - HTML resume and metadata
 * @throws {ApiError} - If generation fails
 */
const generateAtsResume = async ({ userId, resumeId, jobDescriptionId, resumeText, jdText }) => {
  const finalResumeText = await resolveResumeData(userId, resumeId, resumeText);
  const finalJdText = await resolveJobDescriptionData(userId, jobDescriptionId, jdText);

  const prompt = buildAtsPrompt({
    resumeText: finalResumeText,
    jdText: finalJdText,
  });

  const geminiResult = await generateFromGemini({
    prompt,
    responseMimeType: "text/plain",
  });

  if (!geminiResult.rawText || geminiResult.rawText.trim().length === 0) {
    throw new ApiError(502, "AI failed to generate resume HTML");
  }

  return {
    html: geminiResult.rawText,
    aiMeta: {
      model: geminiResult.model,
      usageMetadata: geminiResult.usageMetadata,
    },
  };
};

module.exports = {
  generateInterviewPack,
  generateAtsResume,
};
