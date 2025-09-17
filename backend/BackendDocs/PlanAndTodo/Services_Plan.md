# Plan for Services

This document outlines the plan for creating the service layer for the e-commerce backend. The service layer is a crucial part of the architecture, responsible for containing all the business logic.

## General Approach

- Create a `services` directory at the root of the backend project.
- For each resource or model, a corresponding service file will be created (e.g., `userService.js`, `productService.js`).
- The service layer acts as an intermediary between the controllers and the repositories.
- **Controllers** will call service functions to execute business logic. They are responsible for handling the HTTP request and response, but not the logic itself.
- **Services** will contain the core application logic. They will orchestrate operations, perform calculations, enforce business rules, and call repository functions to access the database.
- **Repositories** will be called by services to perform the actual database CRUD operations.
- Service functions will be pure business logic. They will **not** directly access the `req` or `res` objects. Instead, controllers will pass the necessary data (e.g., `req.body`, `req.params`) as arguments to the service functions.
- Service functions will return data to the controllers or throw custom errors (e.g., using an `AppError` class) which are then caught by the controller and passed to the global error handler.

## Service Structure

Each service file will export a set of `async` functions that encapsulate specific business operations.

```javascript
// Example: userService.js

import * as userRepository from '../repositories/userRepository.js';
import * as tokenService from './tokenService.js'; // A service to handle JWTs
import AppError from '../utils/AppError.js';

// Business logic for user registration
export const registerUserService = async (userData) => {
  // 1. Check if user already exists
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409); // 409 Conflict
  }

  // 2. Create the user (password hashing is handled by the model)
  const newUser = await userRepository.createUser(userData);

  // 3. Generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({ id: newUser._id, role: newUser.role });

  // 4. (Optional) Send a verification email
  // await emailService.sendVerificationEmail(newUser.email, verificationToken);

  // 5. Return the created user and tokens
  return { user: newUser, accessToken, refreshToken };
};

// ... other service functions
```

## Service Implementation Plan

-   **Authentication Services (User, Seller, Admin):**
    -   Handle the logic for registration, including checking for duplicates.
    -   Implement login logic: find the user, validate the password (by calling the model's method), and generate JWT access and refresh tokens.
    -   Manage password reset flows: generate a reset token, save it, and send a password reset email.
    -   Handle token refreshing.

-   **Token Service (`tokenService.js`):** Create a dedicated service for generating, verifying, and managing JWTs (both access and refresh tokens).

-   **Email Service (`emailService.js`):** A service that uses `Nodemailer` to send various types of emails (e.g., email verification, password reset).

-   **Product Service:** Contain logic for creating products, ensuring the associated seller exists. Handle image URL processing from Cloudinary.

-   **Order Service:** Implement the complex business logic for creating an order. This will involve:
    -   Validating product availability and stock.
    -   Calculating the total order price.
    -   Creating the order document in the database.
    -   Decrementing the stock for the purchased products.

-   **File Upload Service (`fileUploadService.js`):** While `multer` handles the upload in middleware, a service might be useful to abstract interactions with Cloudinary, such as deleting an old image when a new one is uploaded.
