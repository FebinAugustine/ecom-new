# Plan for Middlewares

This document outlines the plan for implementing the middlewares for the e-commerce backend.

## General Approach

- Create a `middlewares` directory at the root of the backend project.
- Each middleware function will be placed in its own file within this directory for better modularity and reusability (e.g., `auth.js`, `upload.js`, `rateLimiter.js`, `errorHandler.js`).

## 1. Authentication Middleware (`auth.js`)

- **`verifyToken`**: This middleware will be responsible for verifying the JSON Web Token (JWT) sent in the `Authorization` header of the request. It will decode the token and attach the user payload to the request object (e.g., `req.user`).
- **`verifyTokenAndAuthorization`**: This middleware will first use `verifyToken` to check for a valid token. Then, it will check if the user ID from the token matches the `:id` parameter in the request URL or if the user has an admin role. This is for routes where a user can only access their own resources, or an admin can access any.
- **`verifyTokenAndAdmin`**: This middleware will use `verifyToken` and then check if the user's role is 'admin'. This will be used to protect admin-only routes.

## 2. Multer Middleware (`upload.js`)

- This middleware will handle `multipart/form-data`, which is primarily used for uploading files.
- It will be configured to use `multer-storage-cloudinary` to directly upload files to Cloudinary instead of storing them on the local server first.
- Different upload configurations can be created for different file types or size limits (e.g., one for user avatars, another for product images).

## 3. Rate Limiter Middleware (`rateLimiter.js`)

- This middleware will be implemented using the `express-rate-limit` package.
- It will be applied to all incoming requests to the API to prevent brute-force attacks and abuse.
- The configuration will limit the number of requests an IP address can make within a specific time frame.

## 4. Error Handling Middleware (`errorHandler.js`)

- A centralized error handling middleware will be created to catch errors that occur in the application.
- It will be the last middleware in the stack.
- It will be responsible for sending a standardized JSON error response to the client, including a message and the appropriate status code. It will handle different types of errors (e.g., Mongoose validation errors, custom AppError class) and format them accordingly.
