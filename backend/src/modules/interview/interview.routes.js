const express = require("express");
const controller = require("./interview.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const {
  generateInterviewSchema,
  interviewIdParamSchema,
  updateInterviewSchema,
} = require("./interview.validation");

const router = express.Router();

router.post("/generate", authenticate, validate(generateInterviewSchema), controller.generateInterview);
router.get("/my", authenticate, controller.getMyInterviews);
router.get("/:id", authenticate, validate(interviewIdParamSchema, "params"), controller.getInterviewById);
router.patch(
  "/:id",
  authenticate,
  validate(interviewIdParamSchema, "params"),
  validate(updateInterviewSchema),
  controller.updateInterview
);
router.delete("/:id", authenticate, validate(interviewIdParamSchema, "params"), controller.deleteInterview);

module.exports = router;
