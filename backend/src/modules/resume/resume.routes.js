const express = require("express");
const controller = require("./resume.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const uploadResume = require("../../middleware/resumeUpload.middleware");
const { uploadLimiter } = require("../../middleware/rateLimit.middleware");
const {
  createManualResumeSchema,
  uploadResumeMetaSchema,
  updateResumeSchema,
  resumeIdParamSchema,
} = require("./resume.validation");

const router = express.Router();

router.post("/", authenticate, validate(createManualResumeSchema), controller.createManualResume);

// Apply rate limiting to resume uploads (20 per day)
router.post(
  "/upload",
  authenticate,
  uploadLimiter,
  uploadResume.single("resume"),
  validate(uploadResumeMetaSchema),
  controller.uploadResume
);

router.get("/my", authenticate, controller.getMyResumes);
router.get("/:id", authenticate, validate(resumeIdParamSchema, "params"), controller.getResumeById);
router.patch(
  "/:id",
  authenticate,
  validate(resumeIdParamSchema, "params"),
  validate(updateResumeSchema),
  controller.updateResume
);
router.delete("/:id", authenticate, validate(resumeIdParamSchema, "params"), controller.deleteResume);

module.exports = router;
