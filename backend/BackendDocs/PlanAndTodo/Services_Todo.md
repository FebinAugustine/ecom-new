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

- [ ] **Category Service (`categoryService.js`):
    - [ ] Implement all service functions corresponding to the controller actions.

- [x] **Product Service (`productService.js`):
    - [x] Implement all service functions, including logic for handling image uploads.

- [ ] **Order Service (`orderService.js`):
    - [ ] Implement `createOrderService` with logic for stock validation and reduction.
    - [ ] Implement other order-related service functions.

- [ ] **Review Service (`reviewService.js`):
    - [ ] Implement all service functions.

- [ ] **Cart Service (`cartService.js`):
    - [ ] Implement all service functions.

- [ ] **Wishlist Service (`wishlistService.js`):
    - [ ] Implement all service functions.

- [ ] **Like Service (`likeService.js`):
    - [ ] Implement all service functions.

- [ ] **Invoice Service (`invoiceService.js`):
    - [ ] Implement all service functions.

- [ ] **Reply Service (`replyService.js`):
    - [ ] Implement all service functions.
