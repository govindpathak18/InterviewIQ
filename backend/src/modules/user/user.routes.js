const express = require("express");
const controller = require("./user.controller");
const { authenticate, authorize } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const {
  updateMyProfileSchema,
  changePasswordSchema,
  userIdParamSchema,
  listUsersQuerySchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
} = require("./user.validation");

const router = express.Router();

router.get("/me", authenticate, controller.getMyProfile);

router.patch(
  "/me",
  authenticate,
  validate(updateMyProfileSchema),
  controller.updateMyProfile
);

router.patch(
  "/me/change-password",
  authenticate,
  validate(changePasswordSchema),
  controller.changePassword
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validate(listUsersQuerySchema, "query"),
  controller.listUsers
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(userIdParamSchema, "params"),
  controller.getUserById
);

router.patch(
  "/:id/role",
  authenticate,
  authorize("admin"),
  validate(userIdParamSchema, "params"),
  validate(updateUserRoleSchema),
  controller.updateUserRole
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  validate(userIdParamSchema, "params"),
  validate(updateUserStatusSchema),
  controller.updateUserStatus
);

module.exports = router;
