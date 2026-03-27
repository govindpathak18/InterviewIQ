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
};


module.exports = env;