const { z } = require("zod");

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(80),
  email: z.email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

const loginSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

const refreshSchema = z.object({
  refreshToken: z.string().optional(),
});

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

const sendVerificationEmailSchema = z.object({
  email: z.email("Invalid email address").toLowerCase().optional(),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  sendVerificationEmailSchema,
  verifyEmailSchema,
};