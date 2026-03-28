const ApiError = require("../../utils/ApiError");
const Resume = require("../resume/resume.model");
const JobDescription = require("../jobDescription/jobDescription.model");
const { buildInterviewPrompt } = require("../../prompts/interview.prompt");
const { buildAtsPrompt } = require("../../prompts/ats.prompt");
const { generateFromGemini } = require("./ai.adapter");

const parseGeminiJson = (rawText) => {
  try {
    return JSON.parse(rawText);
  } catch {
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new ApiError(502, "AI response was not valid JSON");
    }

    const slice = rawText.slice(start, end + 1);
    try {
      return JSON.parse(slice);
    } catch {
      throw new ApiError(502, "AI response JSON parsing failed");
    }
  }
};

const getResumeAndJdText = async ({ userId, resumeId, jobDescriptionId, resumeText, jdText }) => {
  let finalResumeText = resumeText;
  let finalJdText = jdText;

  if (!finalResumeText && resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, userId, isActive: true }).lean();
    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }
    finalResumeText = resume.originalText;
  }

  if (!finalJdText && jobDescriptionId) {
    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId, isActive: true }).lean();
    if (!jd) {
      throw new ApiError(404, "Job description not found");
    }
    finalJdText = jd.jdText;
  }

  return { finalResumeText, finalJdText };
};


const normalizeSelfDescription = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const generateInterviewPack = async ({ userId, resumeId, jobDescriptionId, resumeText, jdText, selfDescription }) => {
  const { finalResumeText, finalJdText } = await getResumeAndJdText({
    userId,
    resumeId,
    jobDescriptionId,
    resumeText,
    jdText,
  });

  if (!finalResumeText || !finalJdText) {
    throw new ApiError(400, "Resume text and JD text are required");
  }

  const prompt = buildInterviewPrompt({
    resumeText: finalResumeText,
    jdText: finalJdText,
    selfDescription: normalizeSelfDescription(selfDescription),
  });

  const geminiResult = await generateFromGemini({ prompt });
  const parsed = parseGeminiJson(geminiResult.rawText);

  return {
    ...parsed,
    aiMeta: {
      model: geminiResult.model,
      usageMetadata: geminiResult.usageMetadata,
    },
  };
};

const generateAtsResume = async ({ userId, resumeId, jobDescriptionId, resumeText, jdText }) => {
  const { finalResumeText, finalJdText } = await getResumeAndJdText({
    userId,
    resumeId,
    jobDescriptionId,
    resumeText,
    jdText,
  });

  if (!finalResumeText || !finalJdText) {
    throw new ApiError(400, "Resume text and JD text are required");
  }

  const prompt = buildAtsPrompt({
    resumeText: finalResumeText,
    jdText: finalJdText,
  });

  const geminiResult = await generateFromGemini({
    prompt,
    responseMimeType: "text/plain",
  });

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
