# Todo for Utility Functions

This document outlines the todo list for creating the utility functions for the e-commerce backend.

## General

- [ ] Create a `utils` directory.

## Utility Creation

- [ ] **`AppError.js`:**
    - [ ] Create the `AppError` class that extends `Error`.
    - [ ] Add `statusCode`, `status`, and `isOperational` properties.

- [ ] **`asyncHandler.js`:**
    - [ ] Create the `asyncHandler` higher-order function.
    - [ ] Ensure it catches errors and passes them to `next()`.

- [ ] **`email.js`:**
    - [ ] Create the `sendEmail` utility function.
    - [ ] Integrate it with the `Nodemailer` transport.

- [ ] **`joiValidation.js`:**
    - [ ] Install `joi`.
    - [ ] Create reusable Joi validation schemas.
    - [ ] Create the `validate` middleware function.

- [ ] **`apiResponse.js`:**
    - [ ] Create the standardized `apiResponseHandler` function.

- [ ] **`roleCheck.js`:**
    - [ ] Implement `isAdmin` function.
    - [ ] Implement `isSeller` function.
    - [ ] Implement `isCustomer` function.
