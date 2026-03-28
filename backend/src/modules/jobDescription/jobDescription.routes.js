const express = require("express");
const controller = require("./jobDescription.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const {
  createJobDescriptionSchema,
  updateJobDescriptionSchema,
  jobDescriptionIdParamSchema,
} = require("./jobDescription.validation");

const router = express.Router();

router.post("/", authenticate, validate(createJobDescriptionSchema), controller.createJobDescription);
router.get("/my", authenticate, controller.getMyJobDescriptions);
router.get(
  "/:id",
  authenticate,
  validate(jobDescriptionIdParamSchema, "params"),
  controller.getJobDescriptionById
);
router.patch(
  "/:id",
  authenticate,
  validate(jobDescriptionIdParamSchema, "params"),
  validate(updateJobDescriptionSchema),
  controller.updateJobDescription
);
router.delete(
  "/:id",
  authenticate,
  validate(jobDescriptionIdParamSchema, "params"),
  controller.deleteJobDescription
);

module.exports = router;
