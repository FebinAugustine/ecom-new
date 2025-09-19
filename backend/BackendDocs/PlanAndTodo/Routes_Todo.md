# Todo for API Routes

This document outlines the todo list for implementing the API routes for the e-commerce backend.

## General

- [x] Create a `routes` directory.
- [x] Create the main `index.js` router file.
- [x] Mount the main router in the primary application file (e.g., `app.js`).

## Route File Creation

- [x] **User Routes (`userRoutes.js`):
    - [x] Define all public and protected routes for users.
    - [x] Apply `verifyToken`, `verifyTokenAndAuthorization`, and `verifyTokenAndAdmin` middleware where necessary.

- [x] **Seller Routes (`sellerRoutes.js`):
    - [x] Define all public and protected routes for sellers.
    - [x] Apply authentication and authorization middleware.

- [x] **Admin Routes (`adminRoutes.js`):
    - [x] Define all public and protected routes for admins.
    - [x] Apply authentication and authorization middleware.

- [x] **Category Routes (`categoryRoutes.js`):
    - [x] Define all public and protected routes for categories.
    - [x] Apply middleware for protected routes.

- [x] **Product Routes (`productRoutes.js`):
    - [x] Define all public and protected routes for products.
    - [x] Apply middleware for protected routes.
    - [x] Integrate the `multer` upload middleware for image uploads.

- [x] **Order Routes (`orderRoutes.js`):
    - [x] Define all protected routes for orders.
    - [x] Apply authentication middleware.

- [x] **Invoice Routes (`invoiceRoutes.js`):
    - [x] Define all protected routes for invoices.
    - [x] Apply authentication middleware.

- [x] **Review Routes (`reviewRoutes.js`):
    - [x] Define all public and protected routes for reviews.
    - [x] Apply middleware for protected routes.

- [x] **Cart Routes (`cartRoutes.js`):
    - [x] Define all protected routes for carts.
    - [x] Apply authentication middleware.

- [x] **Wishlist Routes (`wishlistRoutes.js`):
    - [x] Define all protected routes for wishlists.
    - [x] Apply authentication middleware.

- [x] **Like Routes (`likeRoutes.js`):
    - [x] Define all protected routes for likes.
    - [x] Apply authentication middleware.

- [x] **Reply Routes (`replyRoutes.js`):
    - [x] Define all public and protected routes for replies.
    - [x] Apply middleware for protected routes.

## Main Router Integration (`routes/index.js`)

- [x] Import all the created route modules.
- [x] Use `router.use()` to map each router to its base path (e.g., `/users`, `/products`).
