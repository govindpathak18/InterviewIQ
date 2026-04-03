const express = require("express");
const controller = require("./auth.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { authLimiter } = require("../../middleware/rateLimit.middleware");
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

// Apply rate limiting to auth endpoints (CRITICAL SECURITY FIX)
router.post("/register", authLimiter, validate(registerSchema), controller.register);
router.post("/login", authLimiter, validate(loginSchema), controller.login);
router.post("/refresh", validate(refreshSchema), controller.refresh);
router.post("/logout", controller.logout);
router.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  controller.forgotPassword
);
router.post(
  "/reset-password",
  authLimiter,
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
