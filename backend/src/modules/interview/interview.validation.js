const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const generateInterviewSchema = z.object({
  resumeId: z.string().regex(objectIdRegex, "Invalid resume id"),
  jobDescriptionId: z.string().regex(objectIdRegex, "Invalid job description id"),
  selfDescription: z.string().trim().max(5000).optional(),
});

const interviewIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid interview id"),
});

const updateInterviewSchema = z
  .object({
    status: z.enum(["generated", "in-progress", "completed"]).optional(),
    notes: z.string().trim().max(3000).optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

module.exports = {
  generateInterviewSchema,
  interviewIdParamSchema,
  updateInterviewSchema,
};
