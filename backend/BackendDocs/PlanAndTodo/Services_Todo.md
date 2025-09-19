# Todo for Services

This document outlines the todo list for implementing the service layer for the e-commerce backend.

## General

- [x] Create a `services` directory.
- [ ] Create a custom `AppError` utility class.

## Service Creation

- [ ] **Token Service (`tokenService.js`):
    - [ ] Implement `generateTokens` function (for access and refresh tokens).
    - [ ] Implement `verifyAccessToken` function.
    - [ ] Implement `verifyRefreshToken` function.

- [ ] **Email Service (`emailService.js`):
    - [ ] Configure `Nodemailer` transporter.
    - [ ] Implement `sendVerificationEmail` function.
    - [ ] Implement `sendPasswordResetEmail` function.

- [x] **User Service (`userService.js`):
    - [x] `registerUserService`
    - [x] `loginUserService`
    - [x] `getAllUsersService`
    - [x] `getUserByIdService`
    - [x] `getUserByEmailService`
    - [x] `updateUserByIdService`
    - [x] `updateUserAvatarService`
    - [x] `updateUserPasswordService`
    - [x] `logoutUserService`
    - [x] `postRefreshTokenService`
    - [x] `forgotPasswordService`
    - [x] `forgotPasswordVerifyCodeService`
    - [x] `verifyEmailService`
    - [x] `deleteUserByIdService`

- [x] **Seller Service (`sellerService.js`):
    - [x] Implement all service functions corresponding to the controller actions.

- [x] **Admin Service (`adminService.js`):
    - [x] Implement all service functions corresponding to the controller actions.

- [x] **Category Service (`categoryService.js`):
    - [x] Implement all service functions corresponding to the controller actions.

- [x] **Product Service (`productService.js`):
    - [x] Implement all service functions, including logic for handling image uploads.

- [x] **Order Service (`orderService.js`):
    - [x] Implement `createOrderService` with logic for stock validation and reduction.
    - [x] Implement other order-related service functions.

- [x] **Review Service (`reviewService.js`):
    - [x] Implement all service functions.

- [x] **Cart Service (`cartService.js`):
    - [x] Implement all service functions.

- [x] **Wishlist Service (`wishlistService.js`):
    - [x] Implement all service functions.

- [x] **Like Service (`likeService.js`):
    - [x] Implement all service functions.

- [x] **Invoice Service (`invoiceService.js`):
    - [x] Implement all service functions.

- [x] **Reply Service (`replyService.js`):
    - [x] Implement all service functions.
