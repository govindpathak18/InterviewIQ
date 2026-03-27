const express = require("express");
const controller = require("./auth.controller");
const { authenticate } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.post("/logout", controller.logout);

// protected route
router.get("/me", authenticate, controller.me);

module.exports = router;