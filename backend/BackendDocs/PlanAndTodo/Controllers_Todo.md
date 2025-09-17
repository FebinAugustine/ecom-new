# Todo for Controllers

This document outlines the todo list for implementing the controllers for the e-commerce backend.

## General

- [x] Create a `controllers` directory.
- [ ] Create a centralized error handling middleware.

## 1. User Controller (`userController.js`)

- [x] `registerUser`
- [x] `loginUser`
- [x] `getAllUsers`
- [x] `getUserById`
- [x] `updateUserById`
- [x] `updateUserAvatar`
- [x] `updateUserPassword`
- [x] `logoutUser`
- [x] `postRefreshToken`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `verifyEmail`
- [x] `deleteUserById`

## 2. Seller Controller (`sellerController.js`)

- [x] `registerSeller`
- [x] `loginSeller`
- [x] `getAllSellers`
- [x] `getSellerById`
- [x] `updateSellerById`
- [x] `updateSellerBankDetails`
- [x] `updateSellerAvatar`
- [x] `updateSellerPassword`
- [x] `logoutSeller`
- [x] `refreshToken`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `verifyEmail`
- [x] `deleteSellerById`

## 3. Admin Controller (`adminController.js`)

- [x] `registerAdmin`
- [x] `loginAdmin`
- [x] `getAdminById`
- [x] `updateAdminById`
- [x] `logoutAdmin`
- [x] `refreshToken`
- [x] `updateAdminPassword`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `deleteAdminById`

## 4. Category Controller (`categoryController.js`)

- [ ] `createCategory`
- [ ] `getAllCategories`
- [ ] `getCategoryById`
- [ ] `updateCategoryById`
- [ ] `deleteCategoryById`

## 5. Product Controller (`productController.js`)

- [x] `createProduct`
- [x] `getAllProducts`
- [x] `getProductById`
- [x] `getProductsByCategory`
- [x] `updateProductById`
- [x] `updateProductImage`
- [x] `deleteProductById`

## 6. Order Controller (`orderController.js`)

- [ ] `createOrder`
- [ ] `getAllOrders`
- [ ] `getOrderById`
- [ ] `getOrdersBySellerId`
- [ ] `updateOrderById`
- [ ] `updateOrderStatus`
- [ ] `deleteOrderById`

## 7. Review Controller (`reviewController.js`)

- [ ] `createReview`
- [ ] `getAllReviews`
- [ ] `getReviewById`
- [ ] `updateReviewById`
- [ ] `deleteReviewById`

## 8. Cart Controller (`cartController.js`)

- [ ] `addToCart`
- [ ] `getAllCarts`
- [ ] `getCartById`
- [ ] `updateCartById`
- [ ] `deleteCartById`

## 9. Wishlist Controller (`wishlistController.js`)

- [ ] `addToWishlist`
- [ ] `getAllWishlists`
- [ ] `getWishlistById`
- [ ] `updateWishlistById`
- [ ] `deleteWishlistById`

## 10. Like Controller (`likeController.js`)

- [ ] `addToLike`
- [ ] `getAllLikes`
- [ ] `getLikeById`
- [ ] `updateLikeById`
- [ ] `deleteLikeById`

## 11. Invoice Controller (`invoiceController.js`)

- [ ] `createInvoice`
- [ ] `getAllInvoices`
- [ ] `getInvoiceById`
- [ ] `updateInvoiceById`
- [ ] `deleteInvoiceById`

## 12. Reply Controller (`replyController.js`)

- [ ] `createReply`
- [ ] `getAllReplies`
- [ ] `getReplyByReviewId`
- [ ] `updateReplyByReviewId`
- [ ] `deleteReplyById`
