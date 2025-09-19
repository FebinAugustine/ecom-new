// In ./config/redis.js

import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load environment variables right here
dotenv.config({ path: "./.env" });

// For debugging, let's log the variables to be 100% sure
console.log("--- Inside redis.js ---");
console.log("URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log(
  "TOKEN:",
  process.env.UPSTASH_REDIS_REST_TOKEN ? "Loaded" : "Undefined"
);
console.log("-----------------------");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
