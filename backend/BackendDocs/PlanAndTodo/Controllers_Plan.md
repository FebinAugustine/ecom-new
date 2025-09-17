# Plan for Controllers

This document outlines the plan for implementing the controllers for the e-commerce backend.

## General Approach

- Create separate controller files for each resource (e.g., `userController.js`, `productController.js`, etc.) inside a `controllers` directory.
- Use `async/await` for all asynchronous operations to handle promises gracefully.
- Implement robust error handling within each controller function using `try/catch` blocks.
- Forward errors to a centralized error handling middleware for consistent error responses.
- Keep controllers lean by abstracting business logic into a `services` layer.
- Abstract database interactions into a `repositories` layer, which will be called by the services.
- Use a validation library (like Joi) in a middleware to validate request bodies, parameters, and queries before they reach the controller.
- Send consistent and meaningful JSON responses to the client, including appropriate status codes.

## Controller Structure

Each controller file will export a set of functions, where each function corresponds to a specific route and HTTP method.

```javascript
// Example: userController.js

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    // 1. Get request body
    // 2. Call user service to handle business logic
    // 3. Send response
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// ... other controller functions
```

## Resource-Specific Plans

- **User, Seller, and Admin Controllers:** Implement authentication and authorization logic. Hash passwords before saving to the database. Generate JWTs upon successful login.
- **Product and Category Controllers:** Handle file uploads for images using `multer` and upload them to `Cloudinary`.
- **Order Controller:** Implement logic to handle order creation, including updating product stock.
- **Review, Cart, Wishlist, Like, and Reply Controllers:** Implement logic to manage user interactions with products and other users.
- **Invoice Controller:** Generate and manage invoices for orders.
