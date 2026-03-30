const { z } = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const roleEnum = ["user", "admin"];

const profileField = (max) => z.string().trim().max(max).optional();
const optionalUrl = z.union([z.string().trim().url("Invalid URL"), z.literal("")]).optional();

const updateMyProfileSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(80).optional(),
    headline: z.string().trim().max(120, "Headline can be at most 120 characters").optional(),
    skills: z.array(z.string().trim().min(1, "Skill cannot be empty").max(50)).max(50).optional(),
    profilePhoto: optionalUrl,
    bio: z.string().trim().max(500, "Bio can be at most 500 characters").optional(),
    phone: z.string().trim().max(30, "Phone can be at most 30 characters").optional(),
    location: z.string().trim().max(120, "Location can be at most 120 characters").optional(),
    linkedinUrl: optionalUrl,
    githubUrl: optionalUrl,
    websiteUrl: optionalUrl,
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters")
    .max(128, "New password can be at most 128 characters"),
});

const userIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid user id"),
});

const listUsersQuerySchema = z.object({
  role: z.enum(roleEnum).optional(),
  isActive: z
    .union([z.literal("true"), z.literal("false")])
    .transform((value) => value === "true")
    .optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

const updateUserRoleSchema = z.object({
  role: z.enum(roleEnum),
});

const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

module.exports = {
  updateMyProfileSchema,
  changePasswordSchema,
  userIdParamSchema,
  listUsersQuerySchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
};
