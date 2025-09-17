# Plan for API Routes

This document outlines the plan for structuring and implementing the API routes for the e-commerce backend.

## General Approach

- Create a `routes` directory at the root of the backend project.
- Inside the `routes` directory, create a main `index.js` file that will serve as the primary router for the API.
- For each resource (e.g., User, Product, Order), create a separate route file (e.g., `userRoutes.js`, `productRoutes.js`).
- The main application file (`app.js` or `server.js`) will mount the main router from `routes/index.js` under a base path, such as `/api/v1`.
- This modular approach keeps the routing logic organized and easy to manage.

## Routing Structure

1.  **Main Router (`routes/index.js`):**
    -   This file will use `express.Router()`.
    -   It will import all the individual resource-specific routers.
    -   It will then use `router.use()` to delegate requests to the appropriate router based on the URL path (e.g., `router.use('/users', userRoutes)`).

2.  **Resource Routers (e.g., `routes/userRoutes.js`):**
    -   Each of these files will also use `express.Router()`.
    -   It will import the necessary controller functions for that resource (e.g., `registerUser`, `loginUser` from `userController.js`).
    -   It will also import any required middleware (e.g., `verifyToken`, `verifyTokenAndAdmin` from the `middlewares` directory).
    -   Routes will be defined by chaining the HTTP method (`.get()`, `.post()`, etc.) with the path and the corresponding middleware and controller function.

## Route Protection

-   **Public Routes:** Routes that do not require authentication (like registration, login, viewing public products) will be defined without any authentication middleware.
-   **Protected Routes:** Routes that require a user to be logged in will be protected by the `verifyToken` middleware.
-   **Authorization:** Routes that require specific roles (e.g., admin-only) will be further protected by authorization middleware like `verifyTokenAndAdmin` or `verifyTokenAndAuthorization`. This middleware will be placed in the route definition before the controller function.

## Example Route Definition

```javascript
// Example from routes/userRoutes.js

import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} from '../controllers/userController.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
// Only an admin can get all users
router.get('/all-users', verifyToken, verifyTokenAndAdmin, getAllUsers);

// A user can get their own profile, or an admin can get any profile
router.get('/:id', verifyToken, verifyTokenAndAuthorization, getUserById);

export default router;
```
