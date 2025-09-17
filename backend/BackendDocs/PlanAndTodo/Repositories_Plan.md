# Plan for Repositories

This document outlines the plan for creating the repositories for the e-commerce backend. The repository layer is responsible for all direct interactions with the database.

## General Approach

- Create a `repositories` directory at the root of the backend project.
- For each Mongoose model, a corresponding repository file will be created (e.g., `userRepository.js`, `productRepository.js`).
- The repository layer will be the only layer in the application that directly imports and interacts with the Mongoose models.
- Controllers will **not** call repositories directly. Instead, `Services` will call repository functions to perform database operations.
- This separation of concerns (Controller -> Service -> Repository -> Model) makes the application more modular, testable, and easier to maintain.
- All repository functions will be `async` and will return the data retrieved from the database or the result of an operation.

## Repository Structure

Each repository file will import its corresponding Mongoose model and export a set of functions for CRUD (Create, Read, Update, Delete) and other specific database queries.

```javascript
// Example: userRepository.js

import User from '../models/userModel.js';

// Create a new user in the DB
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Find a user by their ID
export const findUserById = async (userId) => {
  return await User.findById(userId);
};

// Find a user by their email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// ... other repository functions for updating, deleting, etc.
```

## Repository Implementation Plan

For each of the 12 models, a repository file will be created with functions that execute the following Mongoose operations:

-   **`create...`**: Use `new Model(data).save()` to create a new document.
-   **`get...ById` / `find...ById`**: Use `Model.findById(id)` to retrieve a single document by its primary key.
-   **`get...ByEmail` / `find...ByEmail`**: Use `Model.findOne({ email })` for finding users/sellers/admins.
-   **`getAll...` / `findAll...`**: Use `Model.find({})` to retrieve all documents in a collection. This can be extended with parameters for filtering, sorting, and pagination.
-   **`update...ById`**: Use `Model.findByIdAndUpdate(id, data, { new: true })` to update a document and return the modified version.
-   **`delete...ById`**: Use `Model.findByIdAndDelete(id)` to remove a document.
-   **Custom Queries**: Implement other specific queries as needed, such as `getProductsByCategory` which will use `Model.find({ category: categoryName })`.
