import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";
import ApiError from "./utils/ApiErrors.js";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware for parsing JSON and urlencoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware for serving static files (if any, e.g., in a 'public' folder)
app.use(express.static("public"));

// Middleware for parsing cookies
app.use(cookieParser());

// --- Routes --- //
app.use("/api/v1", mainRouter);

// Global Error Handling Middleware
// IMPORTANT: This must be the LAST middleware you add.
app.use((err, req, res, next) => {
  // If the error is one of our custom ApiErrors, we handle it gracefully
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: false, // Explicitly state that the request was not successful
      errors: err.errors || [], // Include any validation errors if they exist
    });
  }

  // For any other unexpected errors, return a generic 500 server error
  console.error(err); // Log the unexpected error for debugging
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    success: false,
  });
});

export { app };
