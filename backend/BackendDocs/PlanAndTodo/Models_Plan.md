# Plan for Models

This document outlines the plan for creating the Mongoose models for the e-commerce backend.

## General Approach

- Create a `models` directory at the root of the backend project.
- Each model will be defined in its own file within this directory (e.g., `userModel.js`, `productModel.js`).
- Use Mongoose to define the schema for each model.
- Enable timestamps (`{timestamps: true}`) for all schemas to automatically get `createdAt` and `updatedAt` fields.
- For models that handle passwords (User, Seller, Admin), implement a `pre-save` Mongoose middleware to automatically hash the password before saving it to the database using `bcrypt`.
- For these same models, add an instance method (e.g., `matchPassword`) to compare an entered password with the hashed password in the database.

## Model Definitions

Based on the `Models.md` document, the following Mongoose schemas will be created:

1.  **User (`userModel.js`):** Define the schema with fields like `fullname`, `email`, `password`, etc., applying the specified types, `required`, `unique`, and validation constraints. The `role` will have a default value of `'user'`. References to other models like `Cart`, `Wishlist`, `Order` will be set up using `mongoose.Schema.Types.ObjectId` and the `ref` property.

2.  **Seller (`sellerModel.js`):** Similar to the User model, with fields specific to sellers like `company_name`, `gst`, and bank details. The `role` will default to `'seller'`. References to `Product`, `Order`, etc., will be included.

3.  **Admin (`adminModel.js`):** A simpler model for admin users with the `role` defaulting to `'admin'`. It will also contain references to other collections to provide a top-level view.

4.  **Category (`categoryModel.js`):** Schema for product categories, including `name`, `image`, and a reference to the products within that category.

5.  **Product (`productModel.js`):** A detailed schema for products, including fields for `name`, `description`, `price`, `images` (as an array of strings), `category`, and `seller` references.

6.  **Cart (`cartModel.js`):** Schema to represent a user's shopping cart. It will link a `user_id` to an array of products. The `products` array will likely store objects containing a `product_id` and `quantity`.

7.  **Order (`orderModel.js`):** Schema to store order information, including references to the `User` and `Seller`, an array of `Products`, shipping details, and payment status.

8.  **Review (`reviewModel.js`):** Schema for product reviews, linking a `User`, a `Product`, and containing the `rating` and `review` text.

9.  **Wishlist (`wishlistModel.js`):** A simple schema to manage a user's wishlist, linking a `user_id` to an array of `product_id`s.

10. **Liked (`likeModel.js`):** Similar to the wishlist, this will track products a user has liked.

11. **Invoice (`invoiceModel.js`):** Schema to store invoice details for each order, referencing the `Order`, `User`, and `Seller`.

12. **Reply (`replyModel.js`):** Schema for replies to reviews (or comments), linking a `user_id` to a `comment_id` (which will be a reference to a `Review`).
