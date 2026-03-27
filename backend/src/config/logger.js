const env = require("./env");

const formatMessage = (level, message, meta = {}) => {
  const payload = {
    time: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  if (env.isDev) {
    // readable logs in development
    const metaString = Object.keys(meta).length
      ? ` ${JSON.stringify(meta)}`
      : "";
    return `[${payload.time}] ${level.toUpperCase()}: ${message}${metaString}`;
  }

  // JSON logs for production (better for log tools)
  return JSON.stringify(payload);
};

const logger = {
  info: (message, meta = {}) => {
    console.log(formatMessage("info", message, meta));
  },

  warn: (message, meta = {}) => {
    console.warn(formatMessage("warn", message, meta));
  },

  error: (message, meta = {}) => {
    console.error(formatMessage("error", message, meta));
  },

  debug: (message, meta = {}) => {
    if (env.isDev) {
      console.debug(formatMessage("debug", message, meta));
    }
  },
};

module.exports = logger;