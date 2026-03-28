const express = require("express");
const controller = require("./auth.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { registerSchema, loginSchema, refreshSchema } = require("./auth.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", validate(refreshSchema), controller.refresh);
router.post("/logout", controller.logout);

// protected route
router.get("/me", authenticate, controller.me);

module.exports = router;