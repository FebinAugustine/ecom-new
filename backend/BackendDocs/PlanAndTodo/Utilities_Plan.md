# Plan for Utility Functions

This document outlines the plan for creating various utility functions for the e-commerce backend.

## General Approach

- Create a `utils` directory at the root of the backend project.
- This directory will house a collection of helper functions and classes that can be reused across the application, helping to keep the codebase DRY (Don't Repeat Yourself) and organized.
- Each utility or a group of related utilities will be placed in its own file for clarity (e.g., `AppError.js`, `asyncHandler.js`, `email.js`).

## Utility Implementation Plan

1.  **`AppError.js` - Custom Error Class:**
    -   Instead of a simple `apiErrorHandler` function, a more robust `AppError` class will be created. This class will extend JavaScript's built-in `Error` class.
    -   It will have properties like `statusCode`, `status` (`'fail'` or `'error'`), and `isOperational` to distinguish between predictable application errors and programming bugs.
    -   This class will be used throughout the services and controllers to create meaningful, operational errors that can be gracefully handled by the centralized error handling middleware.

2.  **`asyncHandler.js` - Async Wrapper:**
    -   This utility will be a higher-order function that takes a controller function as an argument.
    -   It will return a new function that executes the original controller function and uses `.catch(next)` to automatically catch any errors from the promise chain and pass them to the global error handling middleware.
    -   This eliminates the need for `try/catch` blocks in every async controller, making the code cleaner.

3.  **`email.js` - Email Sender:**
    -   This file will contain the `sendEmail` utility function.
    -   It will be a wrapper around the `Nodemailer` transport object (which will be configured in `config/` or `services/`).
    -   The function will accept options like `to`, `subject`, and the email body (HTML or text).
    -   This utility will be called by the `emailService` to abstract the actual sending mechanism.

4.  **`joiValidation.js` - Request Validation:**
    -   This file will contain middleware for validating request data using the `Joi` library.
    -   Reusable schemas for different operations (e.g., `createUserSchema`, `loginSchema`) will be defined here or in a separate `schemas` directory.
    -   A `validate` middleware function will be created that takes a Joi schema and validates `req.body`, `req.params`, or `req.query` against it. If validation fails, it will throw an `AppError`.

5.  **`apiResponse.js` - Response Handler:**
    -   This utility will provide a standardized function for sending successful JSON responses.
    -   It will typically take the `res` object, a `statusCode`, the `data` payload, and an optional `message`.
    -   Using this ensures that all success responses from the API have a consistent structure.

6.  **`roleCheck.js` - Role Checkers:**
    -   This file will contain simple boolean functions like `isAdmin(user)`, `isSeller(user)`, etc.
    -   While the primary authorization will be handled by middleware, these functions can be useful for fine-grained logic within service layers where a simple role check is required without the full request context.
