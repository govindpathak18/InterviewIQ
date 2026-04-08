const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createManualResumeSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(120).optional(),
  originalText: z.string().min(500, "Resume text must be at least 500 characters"),
  parsedData: z.record(z.any()).optional(),
});

const uploadResumeMetaSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(120).optional(),
});

const updateResumeSchema = z
  .object({
    title: z.string().trim().min(2).max(120).optional(),
    originalText: z.string().min(500).optional(),
    parsedData: z.record(z.any()).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

const resumeIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid resume id"),
});

module.exports = {
  createManualResumeSchema,
  uploadResumeMetaSchema,
  updateResumeSchema,
  resumeIdParamSchema,
};
