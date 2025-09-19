// In your main server file (index.js)

import dotenv from "dotenv";
// You can still keep this here for other variables like PORT
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import connectDB from "./config/db.js";
// This import will now work correctly because redis.js configures itself
import redisClient from "./config/redis.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Redis, then start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully.");

    // Redis client from @upstash/redis is ready to use after instantiation
    console.log("Redis connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  process.exit(1);
});
