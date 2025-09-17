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

- [ ] **Category Routes (`categoryRoutes.js`):
    - [ ] Define all public and protected routes for categories.
    - [ ] Apply middleware for protected routes.

- [x] **Product Routes (`productRoutes.js`):
    - [x] Define all public and protected routes for products.
    - [x] Apply middleware for protected routes.
    - [x] Integrate the `multer` upload middleware for image uploads.

- [ ] **Order Routes (`orderRoutes.js`):
    - [ ] Define all protected routes for orders.
    - [ ] Apply authentication middleware.

- [ ] **Invoice Routes (`invoiceRoutes.js`):
    - [ ] Define all protected routes for invoices.
    - [ ] Apply authentication middleware.

- [ ] **Review Routes (`reviewRoutes.js`):
    - [ ] Define all public and protected routes for reviews.
    - [ ] Apply middleware for protected routes.

- [ ] **Cart Routes (`cartRoutes.js`):
    - [ ] Define all protected routes for carts.
    - [ ] Apply authentication middleware.

- [ ] **Wishlist Routes (`wishlistRoutes.js`):
    - [ ] Define all protected routes for wishlists.
    - [ ] Apply authentication middleware.

- [ ] **Like Routes (`likeRoutes.js`):
    - [ ] Define all protected routes for likes.
    - [ ] Apply authentication middleware.

- [ ] **Reply Routes (`replyRoutes.js`):
    - [ ] Define all public and protected routes for replies.
    - [ ] Apply middleware for protected routes.

## Main Router Integration (`routes/index.js`)

- [x] Import all the created route modules.
- [x] Use `router.use()` to map each router to its base path (e.g., `/users`, `/products`).
