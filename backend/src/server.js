require("dotenv").config();

const http = require("http");
const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");
const logger = require("./config/logger");

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    server.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
      logger.info(`Environment: ${env.nodeEnv}`);
    });

    // Handle server errors
    server.on("error", (error) => {
      logger.error("Server error", { message: error.message });
      process.exit(1);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      logger.warn(`${signal} received. Shutting down gracefully...`);
      server.close(() => {
        logger.info("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    logger.error("Failed to start server", { message: error.message });
    process.exit(1);
  }
};

startServer();