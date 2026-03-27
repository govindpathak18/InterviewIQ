const mongoose = require("mongoose");
const env = require("./env");
const logger = require("./logger");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongodbUri);

    logger.info("MongoDB connected successfully ✅", {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    });
  } catch (error) {
    logger.error("MongoDB connection failed ❌", {
      message: error.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;