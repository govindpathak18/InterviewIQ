const requiredVars = [
  "NODE_ENV",
  "PORT",
  "API_PREFIX",
  "CLIENT_URL",
  "MONGODB_URI",
  "GEMINI_API_KEY",
  "GEMINI_MODEL",
  "GEMINI_TIMEOUT_MS",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "APP_BASE_URL",
  "RESET_PASSWORD_URL",
  "EMAIL_VERIFY_URL",
];

const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

const env = {
  nodeEnv: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV === "development",

  port: Number(process.env.PORT),
  apiPrefix: process.env.API_PREFIX,
  clientUrl: process.env.CLIENT_URL,

  mongodbUri: process.env.MONGODB_URI,

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
    timeoutMs: Number(process.env.GEMINI_TIMEOUT_MS),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
  },

  appBaseUrl: process.env.APP_BASE_URL,
  resetPasswordUrl: process.env.RESET_PASSWORD_URL,
  emailVerifyUrl: process.env.EMAIL_VERIFY_URL,
};

module.exports = env;
