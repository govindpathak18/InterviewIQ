const ApiError = require("../utils/ApiError");

const validate = (schema, target = "body") => (req, res, next) => {
  const parsed = schema.safeParse(req[target]);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((issue) => issue.message);
    return next(new ApiError(400, messages[0] || "Validation failed", messages));
  }

  // overwrite with sanitized/parsed data
  req[target] = parsed.data;
  return next();
};

module.exports = validate;