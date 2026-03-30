const express = require("express");
const controller = require("./auth.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  sendVerificationEmailSchema,
  verifyEmailSchema,
} = require("./auth.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", validate(refreshSchema), controller.refresh);
router.post("/logout", controller.logout);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  controller.forgotPassword
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  controller.resetPassword
);
router.post(
  "/send-verification-email",
  authenticate,
  validate(sendVerificationEmailSchema),
  controller.sendVerificationEmail
);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  controller.verifyEmail
);

router.get("/me", authenticate, controller.me);

module.exports = router;
