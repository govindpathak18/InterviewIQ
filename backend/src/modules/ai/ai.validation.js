const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createAiInterviewSchema = z
  .object({
    resumeId: z.string().regex(objectIdRegex, "Invalid resume id").optional(),
    jobDescriptionId: z.string().regex(objectIdRegex, "Invalid job description id").optional(),
    resumeText: z.string().min(50).optional(),
    jdText: z.string().min(50).optional(),
    selfDescription: z.string().trim().max(5000).optional(),
  })
  .refine((payload) => Boolean(payload.resumeId || payload.resumeText), {
    message: "Provide either resumeId or resumeText",
  })
  .refine((payload) => Boolean(payload.jobDescriptionId || payload.jdText), {
    message: "Provide either jobDescriptionId or jdText",
  });

const createAtsResumeSchema = z
  .object({
    resumeId: z.string().regex(objectIdRegex, "Invalid resume id").optional(),
    jobDescriptionId: z.string().regex(objectIdRegex, "Invalid job description id").optional(),
    resumeText: z.string().min(50).optional(),
    jdText: z.string().min(50).optional(),
  })
  .refine((payload) => Boolean(payload.resumeId || payload.resumeText), {
    message: "Provide either resumeId or resumeText",
  })
  .refine((payload) => Boolean(payload.jobDescriptionId || payload.jdText), {
    message: "Provide either jobDescriptionId or jdText",
  });

module.exports = {
  createAiInterviewSchema,
  createAtsResumeSchema,
};
