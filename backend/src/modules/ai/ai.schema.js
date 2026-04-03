const { z } = require("zod");

/**
 * Schema for validating individual AI-generated questions
 */
const aiQuestionSchema = z.object({
  type: z.enum(["technical", "behavioral", "hr", "system-design", "other"]),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  question: z.string().min(10, "Question must be at least 10 characters").trim(),
});

/**
 * Schema for validating skill gap analysis
 */
const aiSkillGapSchema = z.object({
  missingSkills: z
    .array(z.string().min(1, "Skill cannot be empty").trim())
    .min(0, "Missing skills array is required"),
  weakAreas: z
    .array(z.string().min(1, "Weak area cannot be empty").trim())
    .min(0, "Weak areas array is required"),
  strengths: z
    .array(z.string().min(1, "Strength cannot be empty").trim())
    .min(0, "Strengths array is required"),
});

/**
 * Schema for validating individual preparation plan days
 */
const aiDayPlanSchema = z.object({
  day: z.number().int().min(1, "Day must be at least 1"),
  focus: z.string().min(5, "Focus must be at least 5 characters").trim(),
  tasks: z
    .array(z.string().min(1, "Task cannot be empty").trim())
    .min(1, "Each day must have at least 1 task"),
});

/**
 * Complete schema for validating AI-generated interview pack
 */
const aiOutputSchema = z.object({
  questions: z
    .array(aiQuestionSchema)
    .min(5, "Interview must have at least 5 questions")
    .max(50, "Interview cannot have more than 50 questions"),
  matchScore: z
    .number()
    .min(0, "Match score must be at least 0")
    .max(100, "Match score cannot be more than 100"),
  skillGap: aiSkillGapSchema,
  preparationPlan: z
    .array(aiDayPlanSchema)
    .min(3, "Preparation plan must have at least 3 days")
    .max(30, "Preparation plan cannot have more than 30 days"),
  summary: z.string().min(20, "Summary must be at least 20 characters").trim(),
});

/**
 * Validate and sanitize AI output
 * @param {Object} data - Data to validate
 * @returns {Object} - Validated and sanitized data
 * @throws {Error} - If validation fails
 */
const validateAiOutput = (data) => {
  const result = aiOutputSchema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`AI output validation failed: ${errorMessages}`);
  }
  return result.data;
};

module.exports = {
  aiQuestionSchema,
  aiSkillGapSchema,
  aiDayPlanSchema,
  aiOutputSchema,
  validateAiOutput,
};
