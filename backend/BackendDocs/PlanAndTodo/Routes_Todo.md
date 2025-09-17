# Todo for API Routes

This document outlines the todo list for implementing the API routes for the e-commerce backend.

## General

- [ ] Create a `routes` directory.
- [ ] Create the main `index.js` router file.
- [ ] Mount the main router in the primary application file (e.g., `app.js`).

## Route File Creation

- [ ] **User Routes (`userRoutes.js`):**
    - [ ] Define all public and protected routes for users.
    - [ ] Apply `verifyToken`, `verifyTokenAndAuthorization`, and `verifyTokenAndAdmin` middleware where necessary.

- [ ] **Seller Routes (`sellerRoutes.js`):**
    - [ ] Define all public and protected routes for sellers.
    - [ ] Apply authentication and authorization middleware.

- [ ] **Admin Routes (`adminRoutes.js`):**
    - [ ] Define all public and protected routes for admins.
    - [ ] Apply authentication and authorization middleware.

- [ ] **Category Routes (`categoryRoutes.js`):**
    - [ ] Define all public and protected routes for categories.
    - [ ] Apply middleware for protected routes.

- [ ] **Product Routes (`productRoutes.js`):**
    - [ ] Define all public and protected routes for products.
    - [ ] Apply middleware for protected routes.
    - [ ] Integrate the `multer` upload middleware for image uploads.

- [ ] **Order Routes (`orderRoutes.js`):**
    - [ ] Define all protected routes for orders.
    - [ ] Apply authentication middleware.

- [ ] **Invoice Routes (`invoiceRoutes.js`):**
    - [ ] Define all protected routes for invoices.
    - [ ] Apply authentication middleware.

- [ ] **Review Routes (`reviewRoutes.js`):**
    - [ ] Define all public and protected routes for reviews.
    - [ ] Apply middleware for protected routes.

- [ ] **Cart Routes (`cartRoutes.js`):**
    - [ ] Define all protected routes for carts.
    - [ ] Apply authentication middleware.

- [ ] **Wishlist Routes (`wishlistRoutes.js`):**
    - [ ] Define all protected routes for wishlists.
    - [ ] Apply authentication middleware.

- [ ] **Like Routes (`likeRoutes.js`):**
    - [ ] Define all protected routes for likes.
    - [ ] Apply authentication middleware.

- [ ] **Reply Routes (`replyRoutes.js`):**
    - [ ] Define all public and protected routes for replies.
    - [ ] Apply middleware for protected routes.

## Main Router Integration (`routes/index.js`)

- [ ] Import all the created route modules.
- [ ] Use `router.use()` to map each router to its base path (e.g., `/users`, `/products`).
