const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const experienceLevels = ["intern", "junior", "mid", "senior", "lead", "not_specified"];
const employmentTypes = ["full-time", "part-time", "contract", "internship", "not_specified"];

const createJobDescriptionSchema = z.object({
  roleTitle: z.string().trim().min(2, "Role title must be at least 2 characters").max(120).optional(),
  companyName: z.string().trim().max(120).optional(),
  jobPostUrl: z.string().trim().url("Invalid job post URL").max(500).optional(),
  jdText: z.string().min(50, "Job description must be at least 50 characters"),
  experienceLevel: z.enum(experienceLevels).optional(),
  employmentType: z.enum(employmentTypes).optional(),
  location: z.string().trim().max(120).optional(),
  resumeId: z.string().regex(objectIdRegex, "Invalid resume id").optional(),
});

const updateJobDescriptionSchema = z
  .object({
    roleTitle: z.string().trim().min(2).max(120).optional(),
    companyName: z.string().trim().max(120).optional(),
    jobPostUrl: z.string().trim().url("Invalid job post URL").max(500).optional(),
    jdText: z.string().min(50).optional(),
    extractedSkills: z.array(z.string().trim().min(1)).optional(),
    experienceLevel: z.enum(experienceLevels).optional(),
    employmentType: z.enum(employmentTypes).optional(),
    location: z.string().trim().max(120).optional(),
    resumeId: z.string().regex(objectIdRegex, "Invalid resume id").optional(),
    isActive: z.boolean().optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

const jobDescriptionIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid job description id"),
});

module.exports = {
  createJobDescriptionSchema,
  updateJobDescriptionSchema,
  jobDescriptionIdParamSchema,
};
