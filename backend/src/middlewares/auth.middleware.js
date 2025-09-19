import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import User from "../models/user.model.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    // Ensure this matches your .env file EXACTLY
    const decodedToken = jwt.verify(token, process.env.AT_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refresh_token"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export const verifyTokenAndAdmin = asyncHandler(async (req, res, next) => {
  // This middleware must run after verifyToken
  if (req.user?.role !== "admin") {
    throw new ApiError(
      403,
      "Forbidden: You do not have permission to perform this action."
    );
  }
  next();
});

export const verifyTokenAndAuthorization = asyncHandler(
  async (req, res, next) => {
    // This middleware must run after verifyToken
    if (
      req.user?._id.toString() === req.params.id ||
      req.user?.role === "admin"
    ) {
      next();
    } else {
      throw new ApiError(
        403,
        "Forbidden: You are not authorized to perform this action."
      );
    }
  }
);
