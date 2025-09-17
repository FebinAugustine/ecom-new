# Todo for Middlewares

This document outlines the todo list for implementing the middlewares for the e-commerce backend.

## General

- [ ] Create a `middlewares` directory.

## 1. Authentication Middleware (`auth.js`)

- [ ] Install `jsonwebtoken`.
- [ ] Implement the `verifyToken` function.
- [ ] Implement the `verifyTokenAndAuthorization` function.
- [ ] Implement the `verifyTokenAndAdmin` function.

## 2. Multer Middleware (`upload.js`)

- [ ] Install `multer` and `multer-storage-cloudinary`.
- [ ] Configure `multer` with Cloudinary storage.
- [ ] Create an `upload` instance for handling file uploads.

## 3. Rate Limiter Middleware (`rateLimiter.js`)

- [ ] Install `express-rate-limit`.
- [ ] Implement the `rateLimiter` middleware.
- [ ] Apply the rate limiter to the main app file.

## 4. Error Handling Middleware (`errorHandler.js`)

- [ ] Create a custom `AppError` class.
- [ ] Implement the centralized `errorHandler` middleware.
- [ ] Apply the error handler as the last middleware in the main app file.
